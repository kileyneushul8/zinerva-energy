# Contact Form Setup Guide

## Overview

The contact form now sends emails directly to `admin@zinervacompany.com` using the Resend email service. This provides a better user experience than the previous `mailto:` link approach.

## Prerequisites

1. **Install Resend package**
   ```bash
   npm install resend
   ```

2. **Get a Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard
   - Add it to your environment variables

## Environment Variables

Add the following to your `.env.local` file (or `.env` for production):

```env
RESEND_API_KEY=re_your_api_key_here
```

For production (Vercel, etc.), add this as an environment variable in your deployment settings.

## Domain Setup (Required for Microsoft Email)

Since your email is set up via Microsoft, you'll need to verify your domain in Resend to send emails from `noreply@zinervacompany.com`. This ensures better deliverability and emails come from your domain.

### Steps to Verify Domain:

1. **Add Domain to Resend:**
   - Go to Resend Dashboard → **Domains**
   - Click **Add Domain**
   - Enter: `zinervacompany.com`
   - Click **Add**

2. **Get DNS Records from Resend:**
   - Resend will provide you with DNS records to add
   - You'll typically need:
     - SPF record (TXT)
     - DKIM record (TXT)
     - DMARC record (TXT) - optional but recommended

3. **Add DNS Records in Microsoft 365:**
   - Go to Microsoft 365 Admin Center
   - Navigate to **Settings** → **Domains**
   - Select `zinervacompany.com`
   - Click **DNS records** or **Manage DNS**
   - Add the TXT records provided by Resend
   - **Important:** Don't remove existing Microsoft DNS records - just add the new Resend records alongside them

4. **Verify Domain:**
   - Go back to Resend Dashboard
   - Click **Verify** on your domain
   - Wait a few minutes for DNS propagation
   - Once verified, the domain status will show as "Verified"

5. **Update API Route (Already Done):**
   - The `from` field is already set to `noreply@zinervacompany.com` in `app/api/contact/route.ts`
   - No code changes needed!

### Alternative: Using Microsoft SMTP (If Domain Verification Fails)

If you prefer to use Microsoft's SMTP directly instead of Resend, we can update the API route to use nodemailer with Microsoft Exchange SMTP. However, Resend is recommended for better deliverability and easier setup.

## How It Works

1. User fills out the contact form on `/contact`
2. Form submits to `/api/contact` endpoint
3. API validates the form data
4. API sends formatted email to `admin@zinervacompany.com` using Resend
5. Reply-to is set to the user's email address
6. User receives confirmation message

## Email Format

The email includes:
- Formatted HTML email with company branding
- Plain text fallback
- All form fields (name, email, company, position, phone, subject, message)
- Preferred contact method
- Reply-to set to user's email

## Testing

To test the contact form:

1. Fill out the form on `/contact`
2. Submit the form
3. Check `admin@zinervacompany.com` inbox
4. Verify email formatting and content

## Troubleshooting

### "Email service not configured" error
- Ensure `RESEND_API_KEY` is set in your environment variables
- Restart your development server after adding the key

### Emails not sending
- Check Resend dashboard for error logs
- Verify API key is correct
- Check domain verification status (if using custom domain)

### Rate limiting
- Resend has rate limits on free tier
- Consider upgrading plan for higher limits

## Alternative Email Services

If you prefer a different email service, you can modify `app/api/contact/route.ts` to use:
- **SendGrid**: Popular alternative
- **AWS SES**: Cost-effective for high volume
- **Nodemailer**: Direct SMTP sending

## Security Notes

- Form validation is handled server-side
- Email addresses are validated before sending
- No sensitive data is logged in production
- API endpoint uses Next.js API routes (server-side only)

