import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.fullName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const sheetData = {
      formType: 'popup',
      timestamp: new Date().toISOString(),
      fullName: formData.fullName,
      email: formData.email
    };

    console.log('Sending popup data to Google Sheets:', sheetData);

    // Submit to Google Sheets
    const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (!sheetsUrl) {
      console.error('Google Sheets URL not configured');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    console.log('Google Sheets URL:', sheetsUrl);

    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });

    console.log('Google Sheets response status:', response.status);

    const result = await response.json();

    if (result.status === 'success') {
      return NextResponse.json(
        { message: 'Popup form submitted successfully' },
        { status: 200 }
      );
    } else {
      console.error('Google Sheets error:', result);
      return NextResponse.json(
        { error: 'Failed to save to Google Sheets' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error submitting popup form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
