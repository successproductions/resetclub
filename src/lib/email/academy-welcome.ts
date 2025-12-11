import nodemailer from 'nodemailer';

export interface WelcomeEmailParams {
  email: string;
  firstName: string;
  password: string;
}

/**
 * Send welcome email with academy login credentials
 */
export async function sendAcademyWelcomeEmail(params: WelcomeEmailParams): Promise<void> {
  const { email, firstName, password } = params;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const academyLoginUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://resetclub.ma'}/academy/login`;

  const emailHTML = `
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
    .credentials { background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0; }
    .credentials-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
    .credentials-label { font-weight: 600; color: #000; }
    .credentials-value { color: #333; font-family: 'Courier New', monospace; background: #fff; padding: 5px 10px; border-radius: 4px; }
    .cta-button { display: inline-block; background-color: #e3bd93; color: #000; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: 600; margin: 20px 0; }
    .cta-button:hover { background-color: #d4ae84; }
    .security-notice { background-color: #fff3cd; border-left: 4px solid: #ffc107; padding: 15px; margin: 20px 0; font-size: 14px; }
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
      <div class="greeting">Bonjour ${firstName},</div>

      <div class="message">
        Bienvenue à <strong>RESET Club Academy</strong> ! 🎓<br><br>
        Suite à votre inscription à la Master Class, nous avons créé votre compte sur notre plateforme de formation en ligne. Vous avez maintenant accès à des formations exclusives conçues pour transformer votre approche du bien-être.
      </div>

      <div class="highlight">
        <h3>🔑 Vos identifiants de connexion :</h3>
        <div class="credentials">
          <div class="credentials-row">
            <span class="credentials-label">Email :</span>
            <span class="credentials-value">${email}</span>
          </div>
          <div class="credentials-row">
            <span class="credentials-label">Mot de passe :</span>
            <span class="credentials-value">${password}</span>
          </div>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="${academyLoginUrl}" class="cta-button">
          Accéder à l'Academy
        </a>
      </div>

      <div class="security-notice">
        <strong>⚠️ Important pour votre sécurité :</strong><br>
        Nous vous recommandons fortement de changer votre mot de passe après votre première connexion. Rendez-vous dans votre profil pour le modifier.
      </div>

      <div class="message">
        <strong>Ce que vous allez découvrir :</strong><br>
        ✓ Formations vidéo exclusives<br>
        ✓ Quiz interactifs pour valider vos connaissances<br>
        ✓ Certificats de completion<br>
        ✓ Suivi de votre progression<br>
        ✓ Accès à vie à vos formations<br><br>
        
        Vous avez des questions ? Notre équipe est là pour vous aider à <strong>contact@resetclub.ma</strong>
      </div>

      <div class="footer">
        <div class="signature">À très bientôt sur l'Academy,<br>L'équipe du RESET Club</div>
        <div class="tagline">Rabat – Centre N°1 de Biohacking & d'Amincissement 360 au Maroc</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"RESET Club Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎓 Bienvenue sur RESET Club Academy - Vos identifiants',
    html: emailHTML,
  });
}
