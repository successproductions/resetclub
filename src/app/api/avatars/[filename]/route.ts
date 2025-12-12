import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // Security: prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const filepath = join(process.cwd(), 'public', 'uploads', 'avatars', filename);
    
    console.log('Serving avatar from:', filepath);
    
    if (!existsSync(filepath)) {
      console.error('Avatar not found:', filepath);
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = await readFile(filepath);
    
    // Determine content type based on file extension
    const ext = filename.split('.').pop()?.toLowerCase();
    const contentType = 
      ext === 'png' ? 'image/png' :
      ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
      ext === 'webp' ? 'image/webp' :
      'image/jpeg';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving avatar:', error);
    return new NextResponse('Error loading image', { status: 500 });
  }
}
