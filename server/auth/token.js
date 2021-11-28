const jwt = require('jsonwebtoken');

const SECRET = 'JWT_PAYLOAD_SECRET_VALUE';
const EXPIRY = '1h';

const sign = (user) => jwt.sign(user, SECRET, { expiresIn: EXPIRY });

module.exports = {
  SECRET,
  sign,
}
