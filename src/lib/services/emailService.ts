import nodemailer from 'nodemailer';

export interface CourseEnquiryEmailPayload {
  name: string;
  email: string;
  phone: string;
  paymentOption: string;
  paymentOptionLabel: string;
  amount: number;
  paymentScreenshot?: {
    filename: string;
    contentType: string;
    buffer: Buffer;
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendCourseEnquiryEmail(payload: CourseEnquiryEmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  notConfigured?: boolean;
}> {
  const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || '465', 10);
  const user =
    process.env.SMTP_USER ||
    process.env.EMAIL_SERVER_USER ||
    process.env.GMAIL_USER ||
    process.env.EMAIL_USER;
  const pass =
    process.env.SMTP_PASS ||
    process.env.EMAIL_SERVER_PASSWORD ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASS;
  const to =
    process.env.NOTIFICATION_EMAIL ||
    process.env.COURSES_RECEIVER_EMAIL ||
    'pccreations25@gmail.com';

  if (!user || !pass) {
    console.warn(
      '[EmailService] SMTP credentials not set (GMAIL_USER & GMAIL_APP_PASSWORD or SMTP_USER & SMTP_PASS in .env.local). Email sending skipped.'
    );
    return {
      success: false,
      notConfigured: true,
      error: 'SMTP credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const attachments = payload.paymentScreenshot
      ? [
          {
            filename: payload.paymentScreenshot.filename,
            content: payload.paymentScreenshot.buffer,
            contentType: payload.paymentScreenshot.contentType,
          },
        ]
      : [];

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff;">
        <div style="background: #000000; padding: 24px; text-align: center; border-bottom: 4px solid #FF9D00;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
            PC CREATIONS
          </h1>
          <p style="color: #FF9D00; margin: 6px 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            New Course Enrollment & Payment Submission
          </p>
        </div>

        <div style="padding: 24px 28px;">
          <p style="font-size: 15px; color: #374151; margin-top: 0; line-height: 1.5;">
            A student has submitted an enrollment request for the <strong>Digital Marketing + AI Course</strong>:
          </p>

          <div style="background: #F7F8FA; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: bold;">Student Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: bold; font-size: 15px;">${escapeHtml(payload.name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone Number:</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="tel:${escapeHtml(payload.phone)}" style="color: #3155E7; text-decoration: none; font-weight: bold;">
                    ${escapeHtml(payload.phone)}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email Address:</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="mailto:${escapeHtml(payload.email)}" style="color: #3155E7; text-decoration: none;">
                    ${escapeHtml(payload.email)}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Payment Option:</td>
                <td style="padding: 8px 0; color: #d97706; font-weight: 900; font-size: 15px;">
                  ${escapeHtml(payload.paymentOptionLabel)}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Amount Paid / Due:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 900; font-size: 16px;">
                  ₹${payload.amount.toLocaleString('en-IN')}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Payment Proof:</td>
                <td style="padding: 8px 0; color: #111827;">
                  ${payload.paymentScreenshot ? `📎 <strong>${escapeHtml(payload.paymentScreenshot.filename)}</strong> (Attached)` : '<span style="color: #dc2626;">No screenshot uploaded</span>'}
                </td>
              </tr>
            </table>
          </div>

          ${
            payload.paymentScreenshot
              ? `<div style="margin: 20px 0; padding: 14px 18px; background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 8px; font-size: 13px; color: #92400E; line-height: 1.5;">
                  📸 <strong>Payment Screenshot Attached:</strong> The student attached <code>${escapeHtml(payload.paymentScreenshot.filename)}</code>. See the email attachment to verify the transaction.
                </div>`
              : ''
          }

          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST · PC Creations Agency
            </p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"PC Creations Courses" <${user}>`,
      to,
      replyTo: payload.email,
      subject: `🎓 New Course Enrollment: ${payload.name} (${payload.paymentOptionLabel})`,
      html,
      attachments,
    });

    console.log(`[EmailService] Email sent successfully: ${info.messageId} to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[EmailService] Failed to send email:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown email error',
    };
  }
}

