import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth/jwt';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    let userId = '';

    // DEV MODE: Allow upload without token for testing
    if (process.env.NODE_ENV === 'development') {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // In dev mode without token, use a test user ID
        userId = 'dev-user';
        console.log('DEV MODE: Using dev-user ID for avatar upload');
      } else {
        const token = authHeader.substring(7);
        const payload = verifyToken(token);
        
        if (payload && payload.userId) {
          userId = payload.userId;
        } else {
          userId = 'dev-user';
          console.log('DEV MODE: Invalid token, using dev-user ID');
        }
      }
    } else {
      // PRODUCTION: Require valid token
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Token manquant' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token);
      
      if (!payload || !payload.userId) {
        return NextResponse.json(
          { error: 'Token invalide' },
          { status: 401 }
        );
      }
      
      userId = payload.userId;
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier invalide. Utilisez JPG, PNG ou WEBP' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale : 5MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `avatar-${userId}-${timestamp}.${extension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/avatars directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
    const filepath = join(uploadDir, filename);

    console.log('Working directory:', process.cwd());
    console.log('Upload directory:', uploadDir);
    console.log('Full filepath:', filepath);
    console.log('Filename:', filename);

    // Create directory if it doesn't exist (using fs/promises)
    const fs = await import('fs/promises');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      console.log('✅ Directory created/verified:', uploadDir);
    } catch (err) {
      console.error('⚠️ Directory creation error (might be OK if exists):', err);
    }

    // Write file
    try {
      console.log('📝 Writing file to:', filepath);
      console.log('File size:', buffer.length, 'bytes');
      await writeFile(filepath, buffer);
      console.log('✅ Avatar saved successfully to:', filepath);
      
      // Verify file exists
      const stats = await fs.stat(filepath);
      console.log('✅ File verified - Size:', stats.size, 'bytes');
    } catch (writeError) {
      console.error('❌ File write error:', writeError);
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde du fichier' },
        { status: 500 }
      );
    }

    // Update user avatar URL in database (skip in dev mode for dev-user)
    const avatarUrl = `/uploads/avatars/${filename}`;
    
    let updatedUser;
    
    if (process.env.NODE_ENV === 'development' && userId === 'dev-user') {
      // In dev mode, return mock user data
      updatedUser = {
        id: 'dev-user',
        email: 'dev@resetclub.ma',
        firstName: 'Dev',
        lastName: 'User',
        role: 'CLIENT',
        avatarUrl
      };
      console.log('DEV MODE: Returning mock user with avatar:', avatarUrl);
    } else {
      // Production: Update database
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          avatarUrl,
          updatedAt: new Date()
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          avatarUrl: true
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Photo de profil mise à jour avec succès',
      user: updatedUser,
      avatarUrl
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du téléchargement de la photo' },
      { status: 500 }
    );
  }
}
