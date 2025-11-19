import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Google Sheets VIEW URL for the direction email (the actual sheet, not the script)
    const googleSheetsViewUrl = process.env.GOOGLE_SHEETS_VIEW_URL || 'https://docs.google.com/spreadsheets/d/1TOhl7JU3bfrapKSY00JKmzqTi2iFP-yhm2_9USqIPWU/edit';

    // Email to CLIENT
    const clientEmail = {
      from: `"RESET Club" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: 'Confirmation de réception – Votre bilan gratuit personnalisé RESET est en cours de traitement',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.8;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #000;
      padding: 0;
      text-align: center;
      margin-bottom: 30px;
      overflow: hidden;
    }
    .header img {
      width: 100%;
      max-width: 600px;
      height: auto;
      display: block;
    }
    .content {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 5px;
    }
    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .message {
      font-size: 15px;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    .highlight {
      background-color: #fff;
      padding: 20px;
      border-left: 4px solid #000;
      margin: 25px 0;
    }
    .highlight h3 {
      margin-top: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .highlight ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    .highlight li {
      margin: 10px 0;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #000;
      text-align: center;
    }
    .signature {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .tagline {
      font-size: 13px;
      color: #666;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://resetclub.ma/images/banner_email.png" alt="RESET Club" />
  </div>

  <div class="content">
    <div class="greeting">
      Bonjour Madame ${formData.lastName},
    </div>

    <div class="message">
      Nous vous confirmons que nous avons bien reçu toutes les informations de votre diagnostic.<br>
      Votre bilan personnalisé RESET est actuellement en cours d'analyse par notre équipe de thérapeutes spécialisées.
    </div>

    <div class="highlight">
      <h3>📞 Vous serez contactée très prochainement par téléphone ou WhatsApp afin de :</h3>
      <ul>
        <li>Valider vos informations.</li>
        <li>Répondre à vos éventuelles questions.</li>
        <li>Programmer la date de récupération de votre bilan.</li>
      </ul>
    </div>

    <div class="message">
      Merci de rester attentive à votre téléphone pour ne pas manquer notre appel.<br>
      Notre équipe fera le maximum pour vous proposer un créneau rapide et adapté à votre planning.
    </div>

    <div class="footer">
      <div class="signature">À très vite,<br>L'équipe du RESET Club</div>
      <div class="tagline">Rabat – Centre N°1 de Biohacking & d'Amincissement 360 au Maroc</div>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Bonjour Madame ${formData.lastName},

Nous vous confirmons que nous avons bien reçu toutes les informations de votre diagnostic.
Votre bilan personnalisé RESET est actuellement en cours d'analyse par notre équipe de thérapeutes spécialisées.

📞 Vous serez contactée très prochainement par téléphone ou WhatsApp afin de :

- Valider vos informations.
- Répondre à vos éventuelles questions.
- Programmer la date de récupération de votre bilan.

Merci de rester attentive à votre téléphone pour ne pas manquer notre appel.
Notre équipe fera le maximum pour vous proposer un créneau rapide et adapté à votre planning.

À très vite,
L'équipe du RESET Club
Rabat – Centre N°1 de Biohacking & d'Amincissement 360 au Maroc
      `
    };

    // Email to DIRECTION
    const directionEmail = {
      from: `"RESET Club - Système" <${process.env.EMAIL_USER}>`,
      to: 'direction@resetclub.ma',
      subject: 'Nouvelle demande de bilan gratuit – Informations client',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #000;
      padding: 0;
      text-align: center;
      margin-bottom: 30px;
      overflow: hidden;
    }
    .header img {
      width: 100%;
      max-width: 700px;
      height: auto;
      display: block;
    }
    .notification-badge {
      background-color: #000;
      color: #fff;
      padding: 15px 20px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
    }
    .content {
      background-color: #f5f5f5;
      padding: 25px;
      border-radius: 5px;
    }
    .section {
      background-color: #fff;
      padding: 20px;
      margin-bottom: 20px;
      border-left: 4px solid #000;
    }
    .section h3 {
      margin-top: 0;
      font-size: 16px;
      font-weight: 600;
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .info-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .info-label {
      font-weight: 600;
      min-width: 150px;
      color: #000;
    }
    .info-value {
      color: #333;
      flex: 1;
    }
    .action-required {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-top: 20px;
    }
    .action-required h3 {
      margin-top: 0;
      color: #856404;
      border: none;
      padding-bottom: 0;
    }
    .action-required ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .link-button {
      display: inline-block;
      background-color: #000;
      color: #fff !important;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 3px;
      margin-top: 15px;
      font-weight: 600;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
      font-size: 13px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://resetclub.ma/images/banner_email.png" alt="RESET Club" />
  </div>
  <div class="notification-badge">
    🔔 Nouvelle demande de bilan gratuit RESET
  </div>

  <div class="content">
    <p>Une nouvelle demande de bilan gratuit RESET vient d'être enregistrée via la landing page.</p>

    <div class="section">
      <h3>Informations client</h3>
      <div class="info-row">
        <div class="info-label">Nom :</div>
        <div class="info-value">${formData.lastName}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Prénom :</div>
        <div class="info-value">${formData.firstName}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Téléphone :</div>
        <div class="info-value">${formData.phone}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email :</div>
        <div class="info-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
      </div>
      <div class="info-row">
        <div class="info-label">Âge :</div>
        <div class="info-value">${formData.age}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Objectif principal :</div>
        <div class="info-value">${formData.mainGoal}</div>
      </div>
    </div>

    <div class="section">
      <h3>Données complètes du diagnostic</h3>
      <p>Accédez au tableau complet de collecte de données :</p>
      <a href="${googleSheetsViewUrl}" class="link-button" target="_blank">📊 Voir le tableau Google Sheets</a>
    </div>

    <div class="action-required">
      <h3>⚠️ Merci de bien vouloir confirmer :</h3>
      <ul>
        <li>Le thérapeute assigné au suivi</li>
        <li>La date prévue pour la récupération du bilan</li>
        <li>Les prochaines étapes pour la livraison du bilan final</li>
      </ul>
    </div>
  </div>

  <div class="footer">
    <strong>RESET Club – Suivi & Coordination</strong><br>
    Cet email a été envoyé automatiquement depuis le système de gestion des demandes.
  </div>
</body>
</html>
      `,
      text: `
Nouvelle demande de bilan gratuit – Informations client

Bonjour,

Une nouvelle demande de bilan gratuit RESET vient d'être enregistrée via la landing page.
Vous trouverez ci-dessous les informations essentielles transmises par le client :

Informations client :

- Nom : ${formData.lastName}
- Prénom : ${formData.firstName}
- Téléphone : ${formData.phone}
- Email : ${formData.email}
- Âge : ${formData.age}
- Objectif principal : ${formData.mainGoal}

Données complètes issues du diagnostic :
👉 ${googleSheetsViewUrl}

Merci de bien vouloir confirmer :

- Le thérapeute assigné au suivi
- La date prévue pour la récupération du bilan
- Les prochaines étapes pour la livraison du bilan final

Bien cordialement,
RESET Club – Suivi & Coordination
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(clientEmail),
      transporter.sendMail(directionEmail)
    ]);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending membership emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
