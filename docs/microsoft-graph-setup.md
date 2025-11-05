# Microsoft Graph API Setup for Contact Form

## Overview

Since SMTP AUTH can't be enabled in Microsoft 365, we're switching to Microsoft Graph API, which is the recommended approach for Microsoft 365.

## Prerequisites

You'll need to register an app in Azure AD and get:
- Client ID (Application ID)
- Client Secret
- Tenant ID

## Step 1: Register App in Azure AD

1. Go to Azure Portal: https://portal.azure.com
2. Navigate to **Azure Active Directory** (or **Microsoft Entra ID**)
3. Click **App registrations** in the left sidebar
4. Click **New registration**
5. Fill in:
   - **Name**: `Zinerva Contact Form`
   - **Supported account types**: Select appropriate option
   - **Redirect URI**: Leave blank for now
6. Click **Register**
7. **Copy the Application (client) ID** - you'll need this
8. **Copy the Directory (tenant) ID** - you'll need this

## Step 2: Create Client Secret

1. In your app registration, click **Certificates & secrets** in the left sidebar
2. Click **New client secret**
3. Fill in:
   - **Description**: `Zinerva Contact Form Secret`
   - **Expires**: Choose an expiration (recommend 24 months)
4. Click **Add**
5. **Copy the secret value immediately** - you won't see it again!

## Step 3: Grant API Permissions

1. In your app registration, click **API permissions** in the left sidebar
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Application permissions** (not Delegated)
5. Add these permissions:
   - `Mail.Send` (under Mail permissions)
6. Click **Add permissions**
7. Click **Grant admin consent for [Your Organization]**
8. Click **Yes** to confirm

## Step 4: Add Environment Variables to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:

   **Variable 1:**
   - Key: `MICROSOFT_CLIENT_ID`
   - Value: `[Your Application (client) ID from Step 1]`
   - Environment: Production

   **Variable 2:**
   - Key: `MICROSOFT_CLIENT_SECRET`
   - Value: `[Your client secret value from Step 2]`
   - Environment: Production

   **Variable 3:**
   - Key: `MICROSOFT_TENANT_ID`
   - Value: `[Your Directory (tenant) ID from Step 1]`
   - Environment: Production

   **Variable 4 (Optional):**
   - Key: `MICROSOFT_SENDER_EMAIL`
   - Value: `admin@zinervacompany.com`
   - Environment: Production

3. Save all variables
4. Redeploy your application

## Troubleshooting

### "InvalidAuthenticationToken" error
- Check that all three credentials are correct
- Verify the client secret hasn't expired
- Ensure admin consent was granted

### "Request_ResourceNotFound" error
- Verify `MICROSOFT_SENDER_EMAIL` is set to a valid mailbox
- Check that the mailbox exists in your organization

### Permission errors
- Ensure `Mail.Send` permission is granted
- Verify admin consent was granted for the permission

