import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a secure random password
 * Format: 3 words + 3 numbers (e.g., Mountain-Sky-River-847)
 */
export function generateSecurePassword(): string {
  const words = [
    'Mountain', 'River', 'Ocean', 'Forest', 'Sky', 'Cloud',
    'Storm', 'Thunder', 'Lightning', 'Desert', 'Valley', 'Canyon',
    'Meadow', 'Prairie', 'Glacier', 'Volcano', 'Sunrise', 'Sunset',
    'Moonlight', 'Starlight', 'Rainbow', 'Horizon', 'Summit', 'Peak'
  ];

  // Select 3 random words
  const selectedWords = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }

  // Generate 3 random numbers
  const numbers = Math.floor(100 + Math.random() * 900).toString();

  // Combine with hyphens
  return `${selectedWords.join('-')}-${numbers}`;
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
