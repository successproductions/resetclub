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
      subject: '✨ Votre demande est confirmée – Bienvenue au RESET Club™',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      overflow: hidden;
    }
    .header {
      background-color: #000;
      padding: 0;
      text-align: center;
    }
    .header img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }
    .intro-content {
      background-color: #ffffff;
      padding: 40px 30px 20px 30px;
      text-align: left;
    }
    .main-content {
      background-color: #f3f4f6; /* gray-200 */
      padding: 30px 30px 40px 30px;
      text-align: left;
    }
    .greeting {
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 20px;
      color: #b79977;
    }
    .message-text {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 0;
    }
    .next-step {
      margin-top: 0;
      margin-bottom: 30px;
    }
    .next-step-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: #000;
    }
    .whatsapp-section {
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .btn-whatsapp {
      display: inline-block;
      background-color: #25D366;
      color: #ffffff !important;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 15px;
    }
    .footer-content {
      background-color: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-top: 1px solid #eee;
    }
    .closing-text {
      font-size: 16px;
      margin-bottom: 20px;
      color: #333;
    }
    .team-signature {
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin-bottom: 5px;
    }
    .tagline {
      font-size: 14px;
      color: #666;
      margin-bottom: 30px;
    }
    .social-icons {
      margin-bottom: 20px;
    }
    .social-icon {
      display: inline-block;
      margin: 0 8px;
      text-decoration: none;
    }
    .social-icon img {
      width: 24px;
      height: 24px;
      display: block;
    }
    .contact-info {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Image with fixed height -->
    <div class="header">
      <img src="https://resetclub.ma/images/banner_email.png" alt="RESET Club Banner" />
    </div>

    <!-- Intro Content (White Background) -->
    <div class="intro-content">
      <div class="greeting">
        Cher ${formData.firstName}
      </div>

      <div class="message-text">
        Votre demande de Diagnostic Biohacking RESET™ a bien été reçue.<br>
        Notre équipe prépare votre rdv pour une analyse personnalisée.
      </div>
    </div>

    <!-- Main Content (Gray Background) -->
    <div class="main-content">
      <div class="next-step">
        <div class="next-step-title">Prochaine étape :</div>
        <div class="message-text">
          Vous serez contactée sous 24–48h par votre thérapeute pour planifier votre bilan (offert – valeur 1500 DH).
        </div>
      </div>

      <div class="message-text">
        Si vous souhaitez accélérer la prise en charge, vous pouvez nous écrire directement ici :
      </div>

      <div class="whatsapp-section">
        <a href="https://wa.me/212689464650" class="btn-whatsapp">👉 WhatsApp : Parler à une conseillère RESET</a>
      </div>
    </div>

    <!-- Footer Content (White Background) -->
    <div class="footer-content">
      <div class="closing-text">
        Merci pour votre confiance.<br>
        Bienvenue au RESET Club. Votre transformation commence maintenant.
      </div>

      <div class="team-signature">
        L’équipe RESET Club™
      </div>
      <div class="tagline">
        Centre N°1 de Biohacking & Transformation 360° à Rabat
      </div>

      <!-- Social Media Icons -->
      <div class="social-icons">
        <a href="https://instagram.com" class="social-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" />
        </a>
        <a href="https://facebook.com" class="social-icon">
           <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://linkedin.com" class="social-icon">
           <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" />
        </a>
        <a href="https://youtube.com" class="social-icon">
           <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
        </a>
      </div>

      <!-- Contact Info -->
      <div class="contact-info">
        Rabat, Maroc<br>
        + 212 689 464 650
      </div>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Cher ${formData.firstName},

Votre demande de Diagnostic Biohacking RESET™ a bien été reçue.
Notre équipe prépare votre rdv pour une analyse personnalisée.

Prochaine étape :
Vous serez contactée sous 24–48h par votre thérapeute pour planifier votre bilan (offert – valeur 1500 DH).

Si vous souhaitez accélérer la prise en charge, vous pouvez nous écrire directement ici :
👉 WhatsApp : https://wa.me/212689464650

Merci pour votre confiance.
Bienvenue au RESET Club. Votre transformation commence maintenant.

L’équipe RESET Club™
Centre N°1 de Biohacking & Transformation 360° à Rabat
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
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 700px;
      margin: 0 auto;
      background-color: #fff;
    }
    .header {
      background-color: #000;
      padding: 0;
      text-align: center;
      overflow: hidden;
    }
    .header img {
      width: 100%;
      height: auto;
      display: block;
      margin: 0;
    }
    .notification-badge {
      background-color: #000;
      color: #fff;
      padding: 15px 20px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      margin: 0;
    }
    .content {
      background-color: #f5f5f5;
      padding: 25px;
      margin: 0;
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
  <div class="email-container">
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
  </div>
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
