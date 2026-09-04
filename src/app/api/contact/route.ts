import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types';

/**
 * Appends the submission to the "CONTACT" tab of the shared spreadsheet, using
 * the same Apps Script endpoint as the popup form. Returns false instead of
 * throwing: a Sheets outage must not cost us the email notification.
 */
async function saveToGoogleSheet(formData: ContactFormData): Promise<boolean> {
  const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.error('Contact form: NEXT_PUBLIC_GOOGLE_SHEETS_URL is not configured');
    return false;
  }

  try {
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: [formData.countryCode, formData.phone].filter(Boolean).join(' '),
        subject: formData.subject || '',
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.status !== 'success') {
      console.error('Contact form: Google Sheets rejected the row:', result);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Contact form: Google Sheets request failed:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const fullPhone = formData.countryCode && formData.phone
      ? `${formData.countryCode} ${formData.phone}`
      : 'Non fourni';

    const emailContent = {
      from: `"${formData.firstName} ${formData.lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: formData.email,
      subject: `Nouveau message: ${formData.subject || 'Contact Reset Club'}`,
      text: `
Nouveau message de contact

Nom: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${fullPhone}
Sujet: ${formData.subject || 'Non spécifié'}

Message:
${formData.message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .message-box { background-color: #fff; padding: 15px; border-left: 4px solid #000; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nouveau message de contact - Reset Club</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nom:</span> ${formData.firstName} ${formData.lastName}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${formData.email}">${formData.email}</a>
      </div>
      <div class="field">
        <span class="label">Téléphone:</span> ${fullPhone}
      </div>
      <div class="field">
        <span class="label">Sujet:</span> ${formData.subject || 'Non spécifié'}
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Store the lead and notify by email in parallel. Either one succeeding is
    // enough to consider the submission handled — failing the request when the
    // row is already written would only invite a duplicate resubmission.
    const [sheetOutcome, mailOutcome] = await Promise.allSettled([
      saveToGoogleSheet(formData),
      transporter.sendMail(emailContent),
    ]);

    const savedToSheet = sheetOutcome.status === 'fulfilled' && sheetOutcome.value;
    const emailSent = mailOutcome.status === 'fulfilled';

    if (mailOutcome.status === 'rejected') {
      console.error('Contact form: email delivery failed:', mailOutcome.reason);
    }

    if (!savedToSheet && !emailSent) {
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', savedToSheet, emailSent },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
