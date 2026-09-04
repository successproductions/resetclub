import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const VALID_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function POST(request: NextRequest) {
  console.log('=== CV Upload API Called ===');
  try {
    const formData = await request.formData();

    const cvFile = formData.get('cvFile') as File | null;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const description = formData.get('description') as string;

    if (!cvFile || !fullName || !phone || !email || !position || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(cvFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and DOC/DOCX are allowed' },
        { status: 400 }
      );
    }

    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Raw uploads keep the extension in the public_id, so the delivered URL
    // ends in .pdf / .docx and opens correctly from the spreadsheet.
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = cvFile.name.split('.').pop() ?? 'pdf';
    const publicId = `CV_${sanitizedName}_${Date.now()}.${fileExtension}`;

    console.log('Uploading CV to Cloudinary...');
    const upload = await uploadToCloudinary({
      buffer,
      publicId,
      folder: 'resetclub/cvs',
    });
    console.log('CV uploaded:', upload.secureUrl);

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (!scriptUrl) {
      throw new Error('NEXT_PUBLIC_GOOGLE_SHEETS_URL is not configured');
    }

    console.log('Sending data to Google Sheets...');
    const scriptResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'recrutons',
        timestamp: new Date().toISOString(),
        fullName,
        phone,
        email,
        position,
        description,
        cvLink: upload.secureUrl,
      }),
    });

    const scriptResult = await scriptResponse.json();
    console.log('Google Sheets response:', scriptResult);

    if (scriptResult.status !== 'success') {
      // The CV is already in Cloudinary — log everything so the application can
      // be recovered by hand rather than being silently lost.
      console.error('Google Sheets rejected the application:', {
        fullName,
        phone,
        email,
        position,
        cvLink: upload.secureUrl,
        sheetsResponse: scriptResult,
      });
      throw new Error('Failed to save to Google Sheets: ' + scriptResult.message);
    }

    return NextResponse.json({
      success: true,
      message: 'CV uploaded successfully',
      cvLink: upload.secureUrl,
    });
  } catch (error) {
    console.error('=== ERROR uploading CV ===');
    console.error('Error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      {
        error: 'Failed to upload CV',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
