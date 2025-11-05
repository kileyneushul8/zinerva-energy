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

## Domain Setup (Optional but Recommended)

To send emails from `noreply@zinervacompany.com` instead of Resend's default domain:

1. Add your domain to Resend
2. Verify domain ownership via DNS records
3. Update the `from` field in `app/api/contact/route.ts` to use your verified domain

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

