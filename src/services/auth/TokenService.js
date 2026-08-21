const jwt = require('jsonwebtoken');

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (decoded.exp < Date.now() / 1000) {
      console.error('Token has expired');
      throw new Error('Token has expired');
    }
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    throw new Error('Invalid token');
  }
}

module.exports = { validateToken };