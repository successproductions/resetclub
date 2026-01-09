import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const sheetData = {
      formType: 'master-class',
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      wantsVIP: formData.wantsVIP ? 'Oui' : 'Non',
      // Survey data
      age: formData.surveyAnswers?.age || '',
      knowsNahed: formData.surveyAnswers?.knowsNahed || '',
      source: formData.surveyAnswers?.source || '',
      knowsBiohacking: formData.surveyAnswers?.knowsBiohacking || '',
      mainGoal: formData.surveyAnswers?.mainGoal || '',
      visitedWellnessCenter: formData.surveyAnswers?.visitedWellnessCenter || '',
      wellnessCenterAppreciation: formData.surveyAnswers?.wellnessCenterAppreciation || '',
      struggleFatLoss: formData.surveyAnswers?.struggleFatLoss || '',
      energyLevel: formData.surveyAnswers?.energyLevel || '',
      resetPriority: formData.surveyAnswers?.resetPriority || ''
    };

    // Submit to Google Sheets
    const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (sheetsUrl) {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
      });
    }

    // Send confirmation email to client
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const clientEmail = {
      from: `"RESET Club - Master Class" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: 'Confirmation d\'inscription - Master Class RESET Club',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.8; color: #333; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #fff; }
    .header { background-color: #000; padding: 0; text-align: center; overflow: hidden; }
    .header img { width: 100%; height: auto; display: block; margin: 0; }
    .content { background-color: #f9f9f9; padding: 30px; margin: 0; }
    .greeting { font-size: 16px; margin-bottom: 20px; font-weight: 600; }
    .message { font-size: 15px; margin-bottom: 25px; line-height: 1.8; }
    .highlight { background-color: #fff; padding: 20px; border-left: 4px solid #e3bd93; margin: 25px 0; }
    .highlight h3 { margin-top: 0; font-size: 16px; font-weight: 600; color: #e3bd93; }
    .highlight ul { margin: 15px 0; padding-left: 20px; }
    .highlight li { margin: 10px 0; line-height: 1.6; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e3bd93; text-align: center; }
    .signature { font-weight: 600; margin-bottom: 5px; }
    .tagline { font-size: 13px; color: #666; font-style: italic; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://resetclub.ma/images/banner_email.png" alt="RESET Club" />
    </div>

    <div class="content">
      <div class="greeting">Bonjour ${formData.name},</div>

      <div class="message">
        Félicitations ! Votre inscription à la Master Class RESET Club a bien été confirmée. 🎉<br><br>
        Nous sommes ravis de vous compter parmi nous pour cet événement exclusif de 3 jours qui va transformer votre approche du bien-être et de la santé.
      </div>

      <div class="highlight">
        <h3>📅 Détails de votre inscription :</h3>
        <ul>
          <li><strong>Nom :</strong> ${formData.name}</li>
          <li><strong>Email :</strong> ${formData.email}</li>
          <li><strong>Téléphone :</strong> ${formData.countryCode} ${formData.phone}</li>
          <li><strong>Ticket VIP :</strong> ${formData.wantsVIP ? 'Oui' : 'Non'}</li>
        </ul>
      </div>

      <div class="message">
        Vous recevrez très prochainement un email avec :<br>
        • Le lien pour rejoindre l'événement virtuel<br>
        • L'horaire détaillé des 3 jours<br>
        • Les ressources à préparer avant le début<br><br>

        En attendant, ajoutez <strong>contact@resetclub.ma</strong> à vos contacts pour ne manquer aucune information importante.
      </div>

      <div class="footer">
        <div class="signature">À très bientôt,<br>L'équipe du RESET Club</div>
        <div class="tagline">Rabat – Centre N°1 de Biohacking & d'Amincissement 360 au Maroc</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send email to direction
    const directionEmail = {
      from: `"RESET Club - Système" <${process.env.EMAIL_USER}>`,
      to: 'direction@resetclub.ma',
      subject: 'Nouvelle inscription Master Class',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .email-container { max-width: 700px; margin: 0 auto; background-color: #fff; }
    .header { background-color: #000; padding: 0; text-align: center; overflow: hidden; }
    .header img { width: 100%; height: auto; display: block; margin: 0; }
    .notification-badge { background-color: #e3bd93; color: #fff; padding: 15px 20px; text-align: center; font-size: 18px; font-weight: 400; margin: 0; }
    .content { background-color: #f5f5f5; padding: 25px; margin: 0; }
    .section { background-color: #fff; padding: 20px; margin-bottom: 20px; border-left: 4px solid #e3bd93; }
    .section h3 { margin-top: 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e3bd93; padding-bottom: 10px; margin-bottom: 15px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
    .info-label { font-weight: 600; min-width: 150px; color: #000; }
    .info-value { color: #333; flex: 1; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://resetclub.ma/images/banner_email.png" alt="RESET Club" />
    </div>
    <div class="notification-badge">
      🎓 Nouvelle inscription Master Class
    </div>

    <div class="content">
      <p>Une nouvelle personne vient de s'inscrire à la Master Class.</p>

      <div class="section">
        <h3>Informations du participant</h3>
        <div class="info-row">
          <div class="info-label">Nom :</div>
          <div class="info-value">${formData.name}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email :</div>
          <div class="info-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Téléphone :</div>
          <div class="info-value">${formData.countryCode} ${formData.phone}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Ticket VIP :</div>
          <div class="info-value">${formData.wantsVIP ? '✅ Oui' : '❌ Non'}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(clientEmail),
      transporter.sendMail(directionEmail)
    ]);

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing master class registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
