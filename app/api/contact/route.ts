import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Get Microsoft SMTP credentials from environment variables
    const SMTP_USER = process.env.SMTP_USER || process.env.MICROSOFT_EMAIL
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD || process.env.MICROSOFT_APP_PASSWORD

    if (!SMTP_USER || !SMTP_PASSWORD) {
      console.error('SMTP credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create nodemailer transporter for Microsoft 365
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USER, // Your Microsoft email (e.g., admin@zinervacompany.com)
        pass: SMTP_PASSWORD, // Your Microsoft app password
      },
      tls: {
        ciphers: 'SSLv3',
      },
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

    // Send email using Microsoft SMTP
    const info = await transporter.sendMail({
      from: `Zinerva Contact Form <${SMTP_USER}>`,
      to: 'admin@zinervacompany.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
      text: emailText,
    })

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
