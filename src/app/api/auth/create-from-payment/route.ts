import { NextRequest, NextResponse } from 'next/server';
import { createUserFromPayment } from '@/lib/auth/create-account';
import { sendAcademyWelcomeEmail } from '@/lib/email/academy-welcome';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, formationId } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create user account
    const result = await createUserFromPayment({
      email: email.toLowerCase(),
      firstName,
      lastName,
      role: 'CLIENT', // Master-class payments create CLIENT users
    });

    if (!result.success || !result.user) {
      return NextResponse.json(
        { error: result.error || 'Failed to create account' },
        { status: 400 }
      );
    }

    // Send welcome email with login credentials
    try {
      await sendAcademyWelcomeEmail({
        email: result.user.email,
        firstName: firstName || 'there',
        password: result.user.password,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the request if email fails
    }

    // If formationId is provided, grant access
    if (formationId) {
      await prisma.formationAccess.create({
        data: {
          userId: result.user.id,
          formationId,
          accessType: 'PURCHASED',
        },
      });

      // Auto-enroll user in the formation
      await prisma.enrollment.create({
        data: {
          userId: result.user.id,
          formationId,
          status: 'ENROLLED',
        },
      });
    }

    return NextResponse.json({
      success: true,
      userId: result.user.id,
      message: 'Account created successfully. Login credentials sent via email.',
    });
  } catch (error) {
    console.error('Error in create-from-payment:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the account' },
      { status: 500 }
    );
  }
}
