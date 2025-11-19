import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types';

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

    // Send email
    await transporter.sendMail(emailContent);

    return NextResponse.json(
      { message: 'Email sent successfully' },
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
