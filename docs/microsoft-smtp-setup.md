# Microsoft SMTP Setup for Contact Form

## Overview

The contact form now uses Microsoft 365 SMTP directly, so you don't need Resend or any third-party email service. It uses your existing Microsoft email setup.

## Setup Steps

### 1. Create Microsoft App Password

Microsoft requires an app password (not your regular password) for SMTP authentication:

1. **Go to Microsoft 365 Account Security:**
   - Visit: https://account.microsoft.com/security
   - Sign in with your Microsoft account

2. **Enable Multi-Factor Authentication (if not already enabled):**
   - Go to **Security** → **Advanced security options**
   - Enable **Two-step verification** if needed

3. **Create App Password:**
   - Go to **Security** → **App passwords** (or search for "app passwords")
   - Click **Create a new app password**
   - Name it: "Zinerva Contact Form"
   - Click **Generate**
   - **Copy the password immediately** (you won't see it again!)
   - The password will look like: `abcd-efgh-ijkl-mnop`

### 2. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - **Key:** `SMTP_USER` (or `MICROSOFT_EMAIL`)
   - **Value:** `admin@zinervacompany.com` (your Microsoft email)
   - **Environments:** Production

   **Variable 2:**
   - **Key:** `SMTP_PASSWORD` (or `MICROSOFT_APP_PASSWORD`)
   - **Value:** The app password you just created
   - **Environments:** Production

4. Click **Save** for each variable

### 3. Redeploy

After adding the environment variables:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**

Or wait for the next automatic deployment when you push to GitHub.

## Environment Variables Summary

Add these to Vercel:

```env
SMTP_USER=admin@zinervacompany.com
SMTP_PASSWORD=your-app-password-here
```

Or use these alternative names (both work):

```env
MICROSOFT_EMAIL=admin@zinervacompany.com
MICROSOFT_APP_PASSWORD=your-app-password-here
```

## How It Works

1. User submits contact form
2. Form data is sent to `/api/contact` endpoint
3. API connects to Microsoft SMTP (`smtp.office365.com`)
4. Email is sent from `admin@zinervacompany.com` to `admin@zinervacompany.com`
5. Reply-to is set to the user's email address

## Troubleshooting

### "Email service not configured" error
- Make sure both `SMTP_USER` and `SMTP_PASSWORD` are set in Vercel
- Redeploy after adding environment variables

### "Authentication failed" error
- Make sure you're using an **app password**, not your regular password
- App passwords are 16 characters with dashes
- Verify the app password was created correctly

### "Connection timeout" error
- Check that SMTP port 587 is not blocked
- Verify Microsoft 365 SMTP is enabled for your account
- Try using port 465 with `secure: true` (requires code change)

### Emails not arriving
- Check spam/junk folder
- Verify `admin@zinervacompany.com` is correct
- Check Microsoft 365 email logs

## Security Notes

- ✅ App passwords are secure and can be revoked individually
- ✅ Environment variables are encrypted in Vercel
- ✅ SMTP uses TLS encryption
- ✅ Never commit app passwords to git

## Alternative: Using Your Regular Password (Not Recommended)

If you can't use app passwords, you can use your regular Microsoft password, but this is **less secure**:

1. May require enabling "Less secure app access" (not recommended)
2. May trigger security alerts
3. App passwords are the recommended approach

## Testing

1. Fill out the contact form on your site
2. Submit the form
3. Check `admin@zinervacompany.com` inbox
4. You should receive a formatted email with all form details

