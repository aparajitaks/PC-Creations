import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendCourseEnquiryEmail } from '@/lib/services/emailService';

export const dynamic = 'force-dynamic';

const PAYMENT_OPTIONS_MAP: Record<string, { label: string; amount: number }> = {
  registration_fee: {
    label: 'Registration Fee (₹499)',
    amount: 499,
  },
  course_fee: {
    label: 'Course Fee (₹7,500)',
    amount: 7500,
  },
  both: {
    label: 'Both (Course Fee + Registration Fee: ₹7,999)',
    amount: 7999,
  },
};

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (checkRateLimit(ip, 6, 60 * 1000)) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const name = (formData.get('name') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim().toLowerCase() || '';
    const paymentOption = (formData.get('paymentOption') as string)?.trim() || '';
    const screenshotFile = formData.get('paymentScreenshot') as File | null;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, message: 'Name, phone number, and email address are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (phone.replace(/[^0-9]/g, '').length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    if (!paymentOption || !PAYMENT_OPTIONS_MAP[paymentOption]) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid payment option (Registration Fee 499, Course Fee 7500, or Both).' },
        { status: 400 }
      );
    }

    const { label: paymentOptionLabel, amount } = PAYMENT_OPTIONS_MAP[paymentOption];

    // Process file screenshot if present
    let screenshotMeta: {
      filename: string;
      contentType: string;
      size: number;
      buffer?: Buffer;
      dataBase64?: string;
    } | undefined;

    if (screenshotFile && screenshotFile.size > 0 && typeof screenshotFile.arrayBuffer === 'function') {
      const maxSizeBytes = 12 * 1024 * 1024; // 12 MB
      if (screenshotFile.size > maxSizeBytes) {
        return NextResponse.json(
          { success: false, message: 'File is too large. Maximum size is 12MB.' },
          { status: 400 }
        );
      }

      const arrayBuffer = await screenshotFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      screenshotMeta = {
        filename: screenshotFile.name || 'payment-screenshot.png',
        contentType: screenshotFile.type || 'image/png',
        size: screenshotFile.size,
        buffer,
        // Store base64 data URL for database review (cap at 6MB for MongoDB 16MB document limit)
        dataBase64: buffer.length < 6 * 1024 * 1024 ? `data:${screenshotFile.type || 'image/png'};base64,${buffer.toString('base64')}` : undefined,
      };
    }

    // Step 1: Save to MongoDB
    let insertedId: any = null;
    try {
      const client = await clientPromise;
      const db = client.db('pc-creations');

      const enquiryDoc = {
        name,
        phone,
        email,
        paymentOption,
        paymentOptionLabel,
        amount,
        paymentScreenshot: screenshotMeta
          ? {
              filename: screenshotMeta.filename,
              contentType: screenshotMeta.contentType,
              size: screenshotMeta.size,
              dataBase64: screenshotMeta.dataBase64,
            }
          : undefined,
        emailNotification: {
          status: 'pending',
        },
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.collection('course_enquiries').insertOne(enquiryDoc);
      insertedId = result.insertedId;

      // Also mirror to contact_submissions for the existing admin dashboard
      await db.collection('contact_submissions').insertOne({
        name,
        email,
        phone,
        company: 'Course Student',
        service: `Digital Marketing + AI (${paymentOptionLabel})`,
        budget: `₹${amount}`,
        message: `Course Enrollment Request. Payment Option: ${paymentOptionLabel} (₹${amount}). ${screenshotMeta ? `Screenshot uploaded: ${screenshotMeta.filename}` : 'No screenshot uploaded.'}`,
        status: 'new',
        whatsappNotification: { status: 'pending' },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (dbErr) {
      console.error('[API course-enquiry] MongoDB save error:', dbErr);
    }

    // Step 2: Send Email Notification
    let emailStatus: 'sent' | 'failed' | 'not_configured' = 'failed';
    let emailError: string | undefined;
    let messageId: string | undefined;

    try {
      const emailResult = await sendCourseEnquiryEmail({
        name,
        email,
        phone,
        paymentOption,
        paymentOptionLabel,
        amount,
        paymentScreenshot: screenshotMeta?.buffer
          ? {
              filename: screenshotMeta.filename,
              contentType: screenshotMeta.contentType,
              buffer: screenshotMeta.buffer,
            }
          : undefined,
      });

      if (emailResult.success) {
        emailStatus = 'sent';
        messageId = emailResult.messageId;
      } else if (emailResult.notConfigured) {
        emailStatus = 'not_configured';
        emailError = emailResult.error;
      } else {
        emailStatus = 'failed';
        emailError = emailResult.error;
      }
    } catch (e) {
      emailStatus = 'failed';
      emailError = e instanceof Error ? e.message : 'Unknown error';
    }

    // Step 3: Update DB with email status
    if (insertedId) {
      try {
        const client = await clientPromise;
        const db = client.db('pc-creations');
        await db.collection('course_enquiries').updateOne(
          { _id: insertedId },
          {
            $set: {
              'emailNotification.status': emailStatus,
              'emailNotification.sentAt': emailStatus === 'sent' ? new Date() : undefined,
              'emailNotification.error': emailError,
              'emailNotification.messageId': messageId,
              updatedAt: new Date(),
            },
          }
        );
      } catch (err) {
        console.error('[API course-enquiry] DB update status error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your course enrollment details and payment proof have been received successfully.',
      id: insertedId,
      emailStatus,
    });
  } catch (err) {
    console.error('[API course-enquiry] Unexpected error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

