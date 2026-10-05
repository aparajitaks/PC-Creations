import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ContactSubmission } from '@/lib/models/contact';
import { ObjectId } from 'mongodb';
import { sendWhatsAppNotification } from '@/lib/services/whatsappService';
import { checkRateLimit } from '@/lib/rateLimit';

// Mark this route as dynamic to prevent build-time MongoDB connection
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP address
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const isRateLimited = checkRateLimit(ip, 5, 60 * 1000); // 5 requests per minute

    if (isRateLimited) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

    // Validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    if (phone.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 100);
    const sanitizedPhone = phone.trim().slice(0, 20);
    const sanitizedCompany = company?.trim().slice(0, 100) || '';
    const sanitizedService = service.trim().slice(0, 100);
    const sanitizedBudget = budget?.trim().slice(0, 50) || '';
    const sanitizedMessage = message.trim().slice(0, 2000);

    const client = await clientPromise;
    const db = client.db('pc-creations');

    // Step 1: Save to MongoDB first (database is source of truth)
    const submission: Omit<ContactSubmission, '_id'> = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      company: sanitizedCompany,
      service: sanitizedService,
      budget: sanitizedBudget,
      message: sanitizedMessage,
      status: 'new',
      whatsappNotification: {
        status: 'pending',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('contact_submissions').insertOne(submission);

    // Step 2: Send WhatsApp notification (non-blocking)
    // We do this AFTER database save to ensure enquiry is never lost
    let whatsappStatus: 'sent' | 'failed' = 'failed';
    let whatsappError: string | undefined;

    try {
      const whatsappResult = await sendWhatsAppNotification({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        service: sanitizedService,
        budget: sanitizedBudget,
        message: sanitizedMessage,
      });

      if (whatsappResult.success) {
        whatsappStatus = 'sent';
      } else {
        whatsappError = whatsappResult.error;
      }
    } catch (whatsappError) {
      console.error('WhatsApp notification error:', whatsappError);
      whatsappError = whatsappError instanceof Error ? whatsappError.message : 'Unknown error';
    }

    // Step 3: Update database with WhatsApp notification status
    await db.collection('contact_submissions').updateOne(
      { _id: result.insertedId },
      {
        $set: {
          whatsappNotification: {
            status: whatsappStatus,
            sentAt: whatsappStatus === 'sent' ? new Date() : undefined,
            error: whatsappError,
          },
          updatedAt: new Date(),
        },
      }
    );

    // Log WhatsApp result for monitoring
    console.log(`Contact submission ${result.insertedId}: Database=SUCCESS, WhatsApp=${whatsappStatus.toUpperCase()}`);

    // Return success even if WhatsApp failed (enquiry is safely stored)
    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
