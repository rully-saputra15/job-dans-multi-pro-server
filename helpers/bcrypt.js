const { hashSync, compareSync, genSaltSync } = require("bcryptjs");

const SALT = genSaltSync(15);

const hashPassword = (password) => {
  return hashSync(password, SALT);
};

const comparePassword = (plainPassword, hashedPassword) => {
  return compareSync(plainPassword, hashedPassword, SALT);
};

module.exports = { hashPassword, comparePassword };
