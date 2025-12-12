import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // Send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/academy/reset-password?token=${resetToken}`;
    
    // TODO: Send email using your email service
    // For now, just log it (remove in production)
    console.log('Password reset link:', resetUrl);

    // You can use your existing email service here
    // Example:
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Réinitialisation de mot de passe - Academy RESET 360',
    //   html: `
    //     <p>Bonjour ${user.firstName || 'Membre'},</p>
    //     <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
    //     <a href="${resetUrl}">${resetUrl}</a>
    //     <p>Ce lien expirera dans 1 heure.</p>
    //   `
    // });

    return NextResponse.json({
      success: true,
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
