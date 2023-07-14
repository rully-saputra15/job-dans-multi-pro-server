const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };

    const payload = verifyToken(access_token);

    const user = await User.findOne({ where: { username: payload.username } });

    if (!user) throw { name: "Unauthenticated" };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
