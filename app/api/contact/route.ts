import { NextRequest, NextResponse } from 'next/server'
import { ConfidentialClientApplication } from '@azure/msal-node'

// Rate limiting storage (in-memory)
// In production, consider using Redis or a database for distributed rate limiting
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 5, // Maximum requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || 'unknown'
  return ip
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetTime) {
    // New entry or expired window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetTime: now + RATE_LIMIT.windowMs,
    }
  }

  if (entry.count >= RATE_LIMIT.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  rateLimitStore.set(ip, entry)

  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting check
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(clientIP)

  if (!rateLimit.allowed) {
    const resetTime = new Date(rateLimit.resetTime).toISOString()
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Please try again later.',
        resetTime,
        retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
  }

  try {
    const body = await request.json()
    const { name, email, company, position, country, phone, subject, message, preferredContact } = body

    // Validate required fields
    if (!name || !email || !subject || !message || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get Microsoft Graph API credentials from environment variables
    const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
    const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET
    const TENANT_ID = process.env.MICROSOFT_TENANT_ID
    const SENDER_EMAIL = process.env.MICROSOFT_SENDER_EMAIL || 'admin@zinervacompany.com'

    if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID) {
      console.error('Microsoft Graph API credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please set MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, and MICROSOFT_TENANT_ID in Vercel environment variables.' },
        { status: 500 }
      )
    }

    // Create MSAL client for authentication
    const msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
      },
    })

    // Get access token using client credentials flow
    const tokenResponse = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    })

    if (!tokenResponse || !tokenResponse.accessToken) {
      throw new Error('Failed to acquire access token')
    }

    const accessToken = tokenResponse.accessToken

    // Format email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #134e4a 0%, #0f766e 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #134e4a; }
            .value { color: #333; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #f97316; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              ${position ? `
              <div class="field">
                <div class="label">Position:</div>
                <div class="value">${position}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Country:</div>
                <div class="value">${country}</div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Preferred Contact Method:</div>
                <div class="value">${preferredContact === 'email' ? 'Email' : 'Phone'}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Country: ${country}
${company ? `Company: ${company}` : ''}
${position ? `Position: ${position}` : ''}
${phone ? `Phone: ${phone}` : ''}
Preferred Contact Method: ${preferredContact === 'email' ? 'Email' : 'Phone'}
Subject: ${subject}

Message:
${message}
    `.trim()

    // Send email using Microsoft Graph API
    const messagePayload = {
      message: {
        subject: `Contact Form: ${subject}`,
        body: {
          contentType: 'HTML',
          content: emailHtml,
        },
        from: {
          emailAddress: {
            address: SENDER_EMAIL,
            name: 'Zinerva Contact Form',
          },
        },
        toRecipients: [
          {
            emailAddress: {
              address: 'admin@zinervacompany.com',
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              address: email,
              name: name,
            },
          },
        ],
      },
    }

    // Send the email using Microsoft Graph API
    const graphApiUrl = `https://graph.microsoft.com/v1.0/users/${SENDER_EMAIL}/sendMail`
    
    const response = await fetch(graphApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messagePayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Graph API error:', response.status, errorText)
      throw new Error(`Failed to send email: ${response.status} ${errorText}`)
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': Math.max(0, rateLimit.remaining - 1).toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    // Provide more detailed error messages
    let errorMessage = 'Internal server error'
    
    if (error.code === 'InvalidAuthenticationToken') {
      errorMessage = 'Authentication failed. Please check your Microsoft Graph API credentials in Vercel environment variables.'
    } else if (error.code === 'Request_ResourceNotFound') {
      errorMessage = 'Email account not found. Please check MICROSOFT_SENDER_EMAIL in Vercel environment variables.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
