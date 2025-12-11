import { prisma } from '@/lib/prisma';
import { hashPassword, generateSecurePassword } from './password';
import { UserRole } from '@prisma/client';

export interface CreateUserFromPaymentParams {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

export interface CreateUserResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    password: string; // Generated password to send via email
  };
  error?: string;
}

/**
 * Create a new academy user account automatically from payment
 * This is triggered when a user completes a master-class payment
 */
export async function createUserFromPayment(
  params: CreateUserFromPaymentParams
): Promise<CreateUserResult> {
  try {
    const { email, firstName, lastName, role = 'CLIENT' } = params;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }

    // Generate a secure random password
    const generatedPassword = generateSecurePassword();
    const passwordHash = await hashPassword(generatedPassword);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        emailVerified: true, // Auto-verify since they paid
        isActive: true,
      },
    });

    // Create user profile
    await prisma.userProfile.create({
      data: {
        userId: user.id,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        password: generatedPassword, // Return plain password to send via email
      },
    };
  } catch (error) {
    console.error('Error creating user from payment:', error);
    return {
      success: false,
      error: 'Failed to create user account',
    };
  }
}

/**
 * Update user email (with re-verification)
 */
export async function updateUserEmail(
  userId: string,
  newEmail: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if new email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser && existingUser.id !== userId) {
      return {
        success: false,
        error: 'Email already in use',
      };
    }

    // Update email and mark as unverified
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: newEmail,
        emailVerified: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user email:', error);
    return {
      success: false,
      error: 'Failed to update email',
    };
  }
}

/**
 * Update user password
 */
export async function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Verify current password
    const { verifyPassword } = await import('./password');
    const isValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isValid) {
      return {
        success: false,
        error: 'Current password is incorrect',
      };
    }

    // Hash and update new password
    const newPasswordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user password:', error);
    return {
      success: false,
      error: 'Failed to update password',
    };
  }
}
