# Sentry Error Monitoring Setup

## Overview

Error monitoring has been set up with Sentry integration. This will help track and monitor errors in production.

## Setup Steps

### Step 1: Install Sentry

```bash
npm install @sentry/nextjs
```

### Step 2: Initialize Sentry

Run the Sentry wizard:

```bash
npx @sentry/wizard@latest -i nextjs
```

This will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js` with Sentry configuration
- Create `sentry.properties` file

### Step 3: Add DSN to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add a new variable:
   - **Key:** `NEXT_PUBLIC_SENTRY_DSN`
   - **Value:** Your Sentry DSN (from Sentry dashboard)
   - **Environment:** Production (and Preview if desired)
3. Click **Save**

### Step 4: Update Error Handling

The error monitoring is already integrated into:
- `app/error.tsx` - Client-side errors
- `components/error-boundary.tsx` - React error boundaries
- API routes can use `captureException` from `lib/error-monitoring.ts`

## What's Being Tracked

- Unhandled errors and exceptions
- API route errors
- Client-side errors
- Performance issues (can be configured)

## Manual Error Tracking

You can manually track errors:

```typescript
import { captureException, captureMessage } from '@/lib/error-monitoring'

// Capture an exception
try {
  // some code
} catch (error) {
  captureException(error as Error, { context: 'additional data' })
}

// Capture a message
captureMessage('Something important happened', 'info')
```

## Troubleshooting

### Errors not showing in Sentry?
- Check that `NEXT_PUBLIC_SENTRY_DSN` is set in Vercel
- Verify the DSN is correct
- Check Sentry dashboard for project configuration
- Ensure you've redeployed after adding the environment variable

## Next Steps

1. Install @sentry/nextjs package
2. Run the Sentry wizard
3. Add DSN to Vercel environment variables
4. Redeploy

The error monitoring utilities are already set up and ready to use once Sentry is installed.

