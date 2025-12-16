import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  console.log('=== CV Upload API Called ===');
  try {
    // Parse form data
    console.log('Parsing form data...');
    const formData = await request.formData();
    
    const cvFile = formData.get('cvFile') as File | null;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const description = formData.get('description') as string;

    // Validate required fields
    if (!cvFile || !fullName || !phone || !email || !position || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!validTypes.includes(cvFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and DOC/DOCX are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = cvFile.name.split('.').pop();
    const fileName = `CV_${sanitizedName}_${timestamp}.${fileExtension}`;

    // Save file to server
    console.log('Saving file to server...');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'cvs');
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    console.log('File saved:', fileName);

    // Generate public URL for the CV
    const cvUrl = `/uploads/cvs/${fileName}`;
    const fullCvUrl = `${request.nextUrl.origin}${cvUrl}`;

    // Send data to Google Apps Script
    console.log('Sending data to Google Sheets...');
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    
    if (!scriptUrl) {
      throw new Error('NEXT_PUBLIC_GOOGLE_SHEETS_URL is not configured');
    }

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
        cvLink: fullCvUrl,
      }),
    });

    const scriptResult = await scriptResponse.json();
    console.log('Google Sheets response:', scriptResult);

    if (scriptResult.status !== 'success') {
      throw new Error('Failed to save to Google Sheets: ' + scriptResult.message);
    }

    return NextResponse.json({
      success: true,
      message: 'CV uploaded successfully',
      cvLink: fullCvUrl,
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
