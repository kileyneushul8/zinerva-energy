import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@microsoft/microsoft-graph-client'
import { ClientCredentialProvider } from '@azure/msal-node'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, position, phone, subject, message, preferredContact } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
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

    // Create client credential provider for authentication
    const clientCredentialProvider = new ClientCredentialProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      tenantId: TENANT_ID,
    })

    // Create Graph client
    const client = Client.initWithMiddleware({
      authProvider: clientCredentialProvider,
    })

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

    // Send the email
    await client.api(`/users/${SENDER_EMAIL}/sendMail`).post(messagePayload)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
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
