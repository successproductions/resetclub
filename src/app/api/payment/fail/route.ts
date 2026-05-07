import { NextRequest, NextResponse } from 'next/server';

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

    const orderId   = params['oid'] || '';
    const errorCode = params['ProcReturnCode'] || 'unknown';
    const baseUrl   = process.env.CMI_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || `https://${request.headers.get('host')}`;

    return NextResponse.redirect(
      `${baseUrl}/fr/payment/fail?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`,
      { status: 303 }
    );
  } catch (error) {
    console.error('CMI Fail redirect error:', error);
    return NextResponse.redirect(
      `${process.env.CMI_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.resetclub.ma'}/fr/payment/fail`,
      { status: 303 }
    );
  }
}

export async function GET(request: NextRequest) {
  const orderId   = request.nextUrl.searchParams.get('oid') || '';
  const errorCode = request.nextUrl.searchParams.get('ProcReturnCode') || 'unknown';
  const baseUrl   = process.env.CMI_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.resetclub.ma';

  return NextResponse.redirect(
    `${baseUrl}/fr/payment/fail?order=${encodeURIComponent(orderId)}&code=${encodeURIComponent(errorCode)}`,
    { status: 303 }
  );
}
