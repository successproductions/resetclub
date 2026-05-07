import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CMI_CONFIG = {
  clientId:   process.env.CMI_CLIENT_ID || process.env.CMI_CLIENT_ID_TEST || process.env.CMI_CLIENT_ID_PROD || '',
  storeKey:   process.env.CMI_STORE_KEY || process.env.CMI_STORE_KEY_TEST || process.env.CMI_STORE_KEY_PROD || '',
  gatewayUrl: process.env.CMI_GATEWAY_URL || process.env.CMI_GATEWAY_URL_TEST || process.env.CMI_GATEWAY_URL_PROD || '',
  currency:   process.env.CMI_CURRENCY || process.env.CMI_CURRENCY_TEST || process.env.CMI_CURRENCY_PROD || '504',
};

interface PaymentRequest {
  fullName:  string;
  email:     string;
  phone:     string;
  address:   string;
  city:      string;
  amount:    number;
  orderId:   string;
  pageSlug?: string;
}

function generateRnd(): string {
  return crypto.randomBytes(10).toString('hex');
}

function cleanBillingString(str: string = '', fallback = 'Client'): string {
  if (!str) return fallback;
  const cleaned = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .substring(0, 50);
  return cleaned || fallback;
}

function generateHash(params: Record<string, string>, storeKey: string): string {
  // CRITICAL: direct code-point comparison — NOT localeCompare (causes hash mismatch on Vercel/Linux)
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
      const value = params[key] || '';
      const escaped = value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
      hashString += escaped + '|';
    }
  }

  hashString += storeKey.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return Buffer.from(hash, 'hex').toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { fullName, email, phone, address, city, amount, orderId, pageSlug } = body;

    let baseUrl = process.env.CMI_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.resetclub.ma';
    if (process.env.NODE_ENV === 'development' && process.env.CMI_USE_LOCAL_URLS === 'true') {
      const origin = request.nextUrl.origin;
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        baseUrl = origin;
      }
    }

    const params: Record<string, string> = {
      clientid:      CMI_CONFIG.clientId,
      amount:        amount.toFixed(2),
      currency:      CMI_CONFIG.currency,
      oid:           orderId,
      rnd:           generateRnd(),
      lang:          'fr',
      storetype:     '3D_PAY_HOSTING',
      hashAlgorithm: 'ver3',
      TranType:      'PreAuth',
      refreshtime:   '5',
      AutoRedirect:  'true',
      redirectGet:   'true',

      okUrl:       `${baseUrl}/api/payment/success`,
      failUrl:     `${baseUrl}/fr/payment/fail`,
      callbackUrl: `${baseUrl}/api/payment/callback`,
      CallbackResponse: 'true',
      shopurl:     `${baseUrl}/${pageSlug || ''}`,

      email: email,
      tel:   phone.replace(/\s/g, ''),

      BillToName:       cleanBillingString(fullName),
      BillToStreet1:    cleanBillingString(address, '-'),
      BillToCity:       cleanBillingString(city, '-'),
      BillToStateProv:  '-',
      BillToPostalCode: '00000',
      BillToCountry:    '504',

      encoding: 'UTF-8',
    };

    const hash = generateHash(params, CMI_CONFIG.storeKey);

    return NextResponse.json({
      success:    true,
      gatewayUrl: CMI_CONFIG.gatewayUrl,
      orderId,
      params:     { ...params, HASH: hash },
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
  }
}
