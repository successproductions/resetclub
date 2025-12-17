import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';

// GET /api/admin/users/[id] - Get user details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'utilisateur' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
    const { id } = await params;

    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      role,
      password,
      isActive
    } = body;

    // Prepare update data
    const updateData: any = {
      firstName: firstName || null,
      lastName: lastName || null,
      role,
      isActive
    };

    // Only update email if provided and different
    if (email) {
      updateData.email = email.toLowerCase();
    }

    // Only hash and update password if provided
    if (password) {
      updateData.passwordHash = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true
      }
    });

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Cet email existe déjà' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'utilisateur' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Authentication disabled
    // TODO: Re-enable in production
    
    const { id } = await params;

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'utilisateur' },
      { status: 500 }
    );
  }
}
