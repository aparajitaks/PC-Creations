/**
 * whatsappService.ts
 * ─────────────────────────────────────────────────────────────
 * Server-side WhatsApp Business API integration.
 *
 * This service handles sending contact form enquiries to the PC Creations
 * business WhatsApp number using the Meta WhatsApp Cloud API.
 *
 * IMPORTANT: All WhatsApp credentials must be stored in backend environment
 * variables, NEVER in frontend code or public environment variables.
 */

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

interface WhatsAppSendResult {
  success: boolean;
  error?: string;
}

/**
 * Format the contact form data into a professional WhatsApp message.
 * Uses WhatsApp-supported formatting (bold with *text*).
 */
function formatWhatsAppMessage(data: ContactFormData): string {
  const receivedDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const message = `🚨 *NEW PC CREATIONS ENQUIRY*

━━━━━━━━━━━━━━━━

👤 *CLIENT DETAILS*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Company / Brand:* ${data.company || 'Not specified'}

━━━━━━━━━━━━━━━━

🎯 *PROJECT DETAILS*

*Service:* ${data.service}
*Budget:* ${data.budget || 'Not specified'}

━━━━━━━━━━━━━━━━

💬 *CLIENT MESSAGE*

${data.message}

━━━━━━━━━━━━━━━━

📅 *ENQUIRY DETAILS*

*Received:* ${receivedDate}
*Status:* NEW

━━━━━━━━━━━━━━━━

⚡ *PC CREATIONS*
New website enquiry`;

  return message;
}

/**
 * Send a WhatsApp message using the Meta WhatsApp Cloud API.
 *
 * This function:
 * - Uses the WhatsApp Business Platform API
 * - Sends to the configured recipient number
 * - Returns success/failure status
 *
 * @param data - Contact form data
 * @returns Promise with send result
 */
export async function sendWhatsAppNotification(
  data: ContactFormData
): Promise<WhatsAppSendResult> {
  try {
    // Get WhatsApp credentials from backend environment variables
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER;
    const apiVersion = process.env.WHATSAPP_API_VERSION || 'v18.0';

    // Validate credentials
    if (!accessToken || !phoneNumberId || !recipientNumber) {
      console.error('WhatsApp credentials missing from environment variables');
      return {
        success: false,
        error: 'WhatsApp credentials not configured',
      };
    }

    // Format the message
    const message = formatWhatsAppMessage(data);

    // Make API request to WhatsApp Cloud API
    const apiUrl = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientNumber,
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', responseData);
      return {
        success: false,
        error: responseData.error?.message || 'WhatsApp API request failed',
      };
    }

    console.log('WhatsApp notification sent successfully:', responseData);
    return { success: true };
  } catch (error) {
    console.error('WhatsApp service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if WhatsApp is properly configured.
 * Returns true if all required environment variables are set.
 */
export function isWhatsAppConfigured(): boolean {
  return !!(
    process.env.WHATSAPP_ACCESS_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    process.env.WHATSAPP_RECIPIENT_NUMBER
  );
}
