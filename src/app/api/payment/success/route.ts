import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CMI_CONFIG = {
  storeKey: process.env.CMI_STORE_KEY || process.env.CMI_STORE_KEY_TEST || process.env.CMI_STORE_KEY_PROD || '',
};

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

    const orderId        = params['oid'] || '';
    const procReturnCode = params['ProcReturnCode'];
    const receivedHash   = params['HASH'] || params['hash'];
    const calculatedHash = generateHash(params, CMI_CONFIG.storeKey);

    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.resetclub.ma';
    if (process.env.NODE_ENV === 'development') {
      const o = request.nextUrl.origin;
      if (o.includes('localhost') || o.includes('127.0.0.1')) baseUrl = o;
    }

    if (procReturnCode === '00' && receivedHash === calculatedHash) {
      // Redirect to existing /fr/confirmation page
      return NextResponse.redirect(new URL(`/fr/confirmation?order=${encodeURIComponent(orderId)}`, baseUrl), { status: 303 });
    } else {
      console.warn('CMI Success: Payment not confirmed or hash mismatch', { procReturnCode, receivedHash, calculatedHash });
      return NextResponse.redirect(new URL(`/fr/payment?error=1&order=${encodeURIComponent(orderId)}`, baseUrl), { status: 303 });
    }
  } catch (error) {
    console.error('CMI Success redirect error:', error);
    return NextResponse.redirect(
      new URL('/fr/payment?error=1', process.env.NEXT_PUBLIC_BASE_URL || '/'),
      { status: 303 }
    );
  }
}

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('oid') || '';
  const code    = request.nextUrl.searchParams.get('ProcReturnCode') || '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.resetclub.ma';

  if (code === '00') {
    return NextResponse.redirect(new URL(`/fr/confirmation?order=${encodeURIComponent(orderId)}`, baseUrl));
  }
  return NextResponse.redirect(new URL(`/fr/payment?error=1&order=${encodeURIComponent(orderId)}`, baseUrl));
}
