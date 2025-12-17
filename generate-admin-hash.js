// Generate bcrypt hash for admin password
// Run this with: node generate-admin-hash.js

const bcrypt = require('bcryptjs');

const password = 'Admin123!';
const saltRounds = 12; // Match what's in /src/lib/auth/password.ts

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  
  console.log('\n=================================');
  console.log('Admin Password Hash Generated');
  console.log('=================================\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUpdate SQL:');
  console.log('----------');
  console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'admin@resetclub.ma';`);
  console.log('\n');
});
