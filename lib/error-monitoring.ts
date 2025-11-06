// Error monitoring setup
// This is a placeholder for Sentry integration
// Install @sentry/nextjs to enable full error monitoring

export function initErrorMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Sentry will be initialized here when package is installed
    // import * as Sentry from "@sentry/nextjs"
    // Sentry.init({...})
  }
}

export function captureException(error: Error, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Sentry.captureException(error, { extra: context })
    console.error('Error captured:', error, context)
  } else {
    console.error('Error:', error, context)
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Sentry.captureMessage(message, level)
    console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](message)
  } else {
    console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](message)
  }
}

