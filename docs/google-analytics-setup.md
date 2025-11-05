# Google Analytics Setup Guide

## Overview

Google Analytics has been integrated into the site. You just need to add your Google Analytics Measurement ID to enable tracking.

## Setup Steps

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Start measuring** or **Admin** (if you already have an account)
4. Create a new property for your website:
   - Property name: `Zinerva Energy Website`
   - Time zone: Your timezone
   - Currency: USD (or your preferred currency)

### Step 2: Get Your Measurement ID

1. In Google Analytics, go to **Admin** (gear icon)
2. Select your property
3. Go to **Data Streams** → **Web**
4. Click on your data stream
5. Copy your **Measurement ID** (looks like: `G-XXXXXXXXXX`)

### Step 3: Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add a new variable:
   - **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (your Measurement ID from Step 2)
   - **Environment:** Production (and Preview if desired)
3. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Verification

After redeploying:

1. Visit your website
2. Open browser DevTools → Network tab
3. Filter for "gtag" or "collect"
4. You should see requests to Google Analytics
5. Or check Google Analytics dashboard → Realtime → Overview

## What's Being Tracked

- Page views (automatically)
- Page paths
- User interactions (can be expanded)

## Privacy & GDPR

If you need GDPR compliance:

1. Add a cookie consent banner
2. Only load Google Analytics after user consent
3. Update the Analytics component to respect consent

## Troubleshooting

### Analytics not working?
- Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel
- Verify the Measurement ID is correct (starts with `G-`)
- Check browser console for errors
- Ensure you've redeployed after adding the environment variable

### No data showing?
- Wait a few minutes (data can take time to appear)
- Check Google Analytics Realtime view
- Verify the Measurement ID is correct
- Check that ad blockers aren't blocking GA

