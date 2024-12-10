const bcrypt = require("bcrypt");

const verifyPassword = function (inputPassword, hashedPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

const hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

module.exports = {
  verifyPassword,
  hashPassword,
};
