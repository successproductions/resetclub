import { NextRequest, NextResponse, after } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY_PROD || 'TEST1234',
};

const IGNORE_HASH_MISMATCH =
  process.env.CMI_IGNORE_CALLBACK_HASH_MISMATCH === 'true';

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function generateHash(params: Record<string, string>, storeKey: string): string {
  const sortedKeys = Object.keys(params).sort((a, b) => {
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la < lb) return -1;
    if (la > lb) return 1;
    return 0;
  });

  let hashString = '';
  for (const key of sortedKeys) {
    const lk = key.toLowerCase();
    if (lk !== 'hash' && lk !== 'encoding') {
      let value = (params[key] || '').replace(/\n$/, '');
      value = decodeHtmlEntities(value);
      const escaped = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escaped + '|';
    }
  }

  hashString += storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return Buffer.from(hash, 'hex').toString('base64');
}

async function sendEmails(params: Record<string, string>) {
  const orderId       = params['oid'];
  const amount        = params['amount'];
  const customerEmail = params['email'];
  const customerName  = params['BillToName'] || 'Client';

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Uses existing EMAIL_PASSWORD key from .env.local
    },
  });

  if (customerEmail) {
    await transporter.sendMail({
      from:    `"Reset Club" <${process.env.EMAIL_USER}>`,
      to:      customerEmail,
      subject: `Confirmation de paiement - ${orderId}`,
      html:    `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Bonjour ${customerName},</h2>
          <p>Votre paiement de <strong>${amount} MAD</strong> a bien été reçu.</p>
          <p>Référence de commande : <strong>${orderId}</strong></p>
          <p>Merci de votre confiance. Notre équipe vous contactera prochainement.</p>
          <br/>
          <p>L'équipe Reset Club</p>
        </div>
      `,
    });
  }

  await transporter.sendMail({
    from:    `"Reset Club Payments" <${process.env.EMAIL_USER}>`,
    to:      process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '',
    subject: `Nouveau paiement reçu - ${orderId} - ${amount} MAD`,
    html:    `
      <div style="font-family: sans-serif;">
        <h2>Nouveau paiement reçu</h2>
        <p><strong>Commande :</strong> ${orderId}</p>
        <p><strong>Montant :</strong> ${amount} MAD</p>
        <p><strong>Client :</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Téléphone :</strong> ${params['tel'] || 'N/A'}</p>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const params: Record<string, string> = {};

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      new URLSearchParams(text).forEach((v, k) => { params[k] = v; });
    } else {
      const fd = await request.formData();
      fd.forEach((v, k) => { params[k] = v.toString(); });
    }

    const receivedHash   = params['HASH'] || params['hash'];
    const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

    if (receivedHash !== calculatedHash) {
      console.error('CMI Callback: Hash mismatch', {
        receivedHash,
        calculatedHash,
        storeKeyConfigured: Boolean(CMI_CONFIG.storeKey),
      });

      if (!IGNORE_HASH_MISMATCH) {
        return new NextResponse('FAILURE', {
          status:  200,
          headers: { 'Content-Type': 'text/plain' },
        });
      }

      console.warn('CMI Callback: temporarily ignoring hash mismatch because CMI_IGNORE_CALLBACK_HASH_MISMATCH=true');
    }

    const procReturnCode = params['ProcReturnCode'];

    if (procReturnCode === '00') {
      const callbackAction = process.env.CMI_AUTO_POSTAUTH === 'false' ? 'APPROVED' : 'ACTION=POSTAUTH';

      console.log('CMI Callback: approved payment, returning', callbackAction);

      // Fire-and-forget emails AFTER responding to CMI
      after(async () => {
        try {
          await sendEmails(params);
        } catch (emailError) {
          console.error('Email send error:', emailError);
        }
      });

      // MUST respond with exact plain text immediately, like the official CMI PHP sample.
      return new NextResponse(callbackAction, {
        status:  200,
        headers: { 'Content-Type': 'text/plain' },
      });
    } else {
      console.warn('CMI Callback: Payment not approved, code:', procReturnCode);
      return new NextResponse('APPROVED', {
        status:  200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error) {
    console.error('CMI Callback error:', error);
    return new NextResponse('FAILURE', {
      status:  200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
