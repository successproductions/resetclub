import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    const filepath = join(process.cwd(), 'public', 'uploads', 'avatars', filename);
    const exists = existsSync(filepath);

    return NextResponse.json({
      filename,
      filepath,
      exists,
      cwd: process.cwd()
    });
  } catch (error) {
    console.error('Check file error:', error);
    return NextResponse.json({ error: 'Error checking file' }, { status: 500 });
  }
}
