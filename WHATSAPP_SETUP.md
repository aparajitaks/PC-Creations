# WhatsApp Business API Setup Guide

This document explains how to configure the server-side WhatsApp notification system for the PC Creations contact form.

## Overview

The contact form now sends enquiries to the PC Creations business WhatsApp number through the **Meta WhatsApp Cloud API**. This is a **server-side** implementation - the client never sees WhatsApp credentials or is redirected to WhatsApp.

## Architecture

```
Client fills form
    ↓
POST /api/contact
    ↓
Backend validation + rate limiting
    ↓
MongoDB (save enquiry first)
    ↓
WhatsApp Business API (send notification)
    ↓
PC Creations WhatsApp receives formatted message
    ↓
Client sees success message (stays on website)
```

## Required Environment Variables

Add these to your **backend** environment variables (`.env.local`):

### 1. MongoDB Configuration
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/pc-creations
```

### 2. Admin Authentication
```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

### 3. WhatsApp Business API (BACKEND-ONLY)

**IMPORTANT:** These variables must NOT be prefixed with `NEXT_PUBLIC_`. They are backend-only and will never be exposed to the browser.

```env
# WhatsApp Business Access Token
# Get this from: https://developers.facebook.com/apps/
# Navigate to your app > WhatsApp > Configuration
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token

# WhatsApp Phone Number ID
# The ID of your WhatsApp Business phone number
# Found in: Meta Business Suite > WhatsApp > Phone Number ID
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# WhatsApp Recipient Number
# The phone number that will receive notifications (PC Creations business number)
# Format: country code + number (no spaces, dashes, or + sign)
# Example: 917204511681 for +91 72045 11681
WHATSAPP_RECIPIENT_NUMBER=917204511681

# WhatsApp API Version (optional, defaults to v18.0)
WHATSAPP_API_VERSION=v18.0
```

### 4. Frontend Environment Variables (Safe to expose)

These are prefixed with `NEXT_PUBLIC_` and are safe to expose to the browser:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=917204511681
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/pc_creations_1/
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/p/PC-Creations-61583072954049/
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/pc-creations-2895963a0/
```

## Step-by-Step Setup

### Step 1: Create a Meta Developer Account

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Create a developer account (if you don't have one)
3. Verify your identity if required

### Step 2: Create a Meta App

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Click "Create App"
3. Select "Business" type
4. Choose "WhatsApp" as the product
5. Name your app (e.g., "PC Creations Website")

### Step 3: Configure WhatsApp

1. In your app dashboard, go to "WhatsApp" > "Getting Started"
2. Add your phone number (the PC Creations business number)
3. Verify the phone number via SMS or call
4. Copy the **Phone Number ID** (this is your `WHATSAPP_PHONE_NUMBER_ID`)

### Step 4: Generate Access Token

1. In WhatsApp > Configuration, find "Access Token"
2. Click "Generate" or "Manage"
3. Set token expiration (choose a long expiration like 60 days for production)
4. Copy the **Access Token** (this is your `WHATSAPP_ACCESS_TOKEN`)

### Step 5: Add Recipient Number

1. In your `.env.local`, set `WHATSAPP_RECIPIENT_NUMBER` to your verified phone number
2. Format: country code + number without spaces or `+`
3. Example: `917204511681` for `+91 72045 11681`

### Step 6: Test the Integration

1. Add all environment variables to `.env.local`
2. Restart your development server
3. Submit a test enquiry through the contact form
4. Check:
   - MongoDB: Enquiry is saved with `whatsappNotification.status`
   - WhatsApp: PC Creations business number receives the formatted message
   - Admin dashboard: Shows WhatsApp notification status

## Message Format

The WhatsApp message sent to PC Creations is formatted professionally:

```
🚨 *NEW PC CREATIONS ENQUIRY*

━━━━━━━━━━━━━━━━

👤 *CLIENT DETAILS*

*Name:* [Client Name]
*Email:* [Client Email]
*Phone:* [Client Phone]
*Company / Brand:* [Company]

━━━━━━━━━━━━━━━━

🎯 *PROJECT DETAILS*

*Service:* [Service]
*Budget:* [Budget]

━━━━━━━━━━━━━━━━

💬 *CLIENT MESSAGE*

[Message content]

━━━━━━━━━━━━━━━━

📅 *ENQUIRY DETAILS*

*Received:* [Date and Time]
*Status:* NEW

━━━━━━━━━━━━━━━━

⚡ *PC CREATIONS*
New website enquiry
```

## Important Notes

### Security
- **NEVER** expose WhatsApp credentials to the frontend
- **NEVER** commit `.env.local` to version control
- **NEVER** use `NEXT_PUBLIC_` prefix for WhatsApp credentials
- Rotate access tokens periodically

### WhatsApp Template Requirements
- For production, Meta may require an approved message template
- Check your WhatsApp Business account settings
- If a template is required, the integration will need to use the template instead of free-form text

### Failure Handling
- If WhatsApp fails, the enquiry is **still saved** to MongoDB
- The client sees success message regardless of WhatsApp status
- Admin dashboard shows WhatsApp notification status (sent/failed)
- Check admin dashboard for failed notifications and follow up manually

### Rate Limiting
- The contact endpoint has rate limiting: 5 requests per minute per IP
- This prevents spam and abuse
- Adjust in `src/lib/rateLimit.ts` if needed

## Troubleshooting

### WhatsApp Not Sending
1. Check environment variables are set correctly
2. Verify Phone Number ID is correct
3. Verify Access Token is not expired
4. Check Meta App Dashboard for API errors
5. Check browser console for errors (only if frontend issues)

### Message Template Required
If you see an error about message templates:
1. Go to Meta Business Suite > WhatsApp > Message Templates
2. Create a template with the enquiry fields
3. Update `src/lib/services/whatsappService.ts` to use the template
4. Submit template for approval (may take 24-48 hours)

### Admin Dashboard Not Showing WhatsApp Status
1. Check that `whatsappNotification` field exists in MongoDB documents
2. Verify the frontend interface matches the new model
3. Check browser console for errors

## File Structure

```
src/
├── lib/
│   ├── models/
│   │   └── contact.ts              # Updated with WhatsApp notification tracking
│   ├── services/
│   │   └── whatsappService.ts      # WhatsApp Business API integration
│   ├── rateLimit.ts                # Rate limiting implementation
│   └── mongodb.ts                  # MongoDB connection
├── app/
│   └── api/
│       ├── contact/
│       │   └── route.ts            # Contact endpoint with WhatsApp integration
│       └── admin/
│           └── enquiries/
│               └── page.tsx         # Admin dashboard with WhatsApp status
└── components/
    └── sections/
        └── ContactSection.tsx      # Updated to call backend API
```

## Testing Checklist

- [ ] Environment variables are set in `.env.local`
- [ ] WhatsApp Business account is verified
- [ ] Phone Number ID is correct
- [ ] Access Token is valid and not expired
- [ ] Recipient number is verified
- [ ] Test enquiry is submitted
- [ ] MongoDB saves the enquiry
- [ ] WhatsApp receives the formatted message
- [ ] Client sees success message
- [ ] No WhatsApp tab opens for client
- [ ] Admin dashboard shows WhatsApp status
- [ ] Rate limiting works (try submitting multiple times quickly)

## Support

For issues with:
- **Meta Developer Account**: https://developers.facebook.com/support/
- **WhatsApp Business API**: https://developers.facebook.com/docs/whatsapp/
- **MongoDB**: Check MongoDB Atlas dashboard
- **Code**: Check browser console and server logs
