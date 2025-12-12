const bcrypt = require('bcryptjs');
const hash = '$2a$12$XrZ9YKj5YHf8OGX2QH.QXOqKq8YYqJmv0wHvP.3GfLZmE5hEJN6b6';
const password = 'admin123';
bcrypt.compare(password, hash).then(result => {
  console.log('Password matches:', result);
}).catch(err => {
  console.error('Error:', err);
});
