const { sign, verify } = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

const signToken = (payload) => {
  return sign(payload, SECRET);
};

const verifyToken = (token) => {
  return verify(token, SECRET);
};

module.exports = { signToken, verifyToken };
