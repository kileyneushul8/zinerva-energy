# Vercel Environment Variables Setup

## Contact Form API Key

### Required Variable

**Name:** `RESEND_API_KEY`  
**Value:** Your Resend API key (starts with `re_`)  
**Environments:** Production (and Preview if desired)

### How to Get Your Resend API Key

1. Sign up/Login at [resend.com](https://resend.com)
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Name it (e.g., "Zinerva Contact Form")
5. Copy the key (you'll only see it once!)

### Adding to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Paste your Resend API key
   - **Environments:** Select Production (and Preview if desired)
5. Click **Save**
6. **Redeploy** your latest deployment for changes to take effect

### Verifying It Works

1. Go to your contact form page
2. Fill out and submit the form
3. Check `admin@zinervacompany.com` inbox
4. You should receive a formatted email with all form details

### Troubleshooting

- **"Email service not configured"**: Make sure `RESEND_API_KEY` is set in Vercel
- **Emails not sending**: Check Resend dashboard for error logs
- **Rate limiting**: Resend has rate limits on free tier - consider upgrading if needed

