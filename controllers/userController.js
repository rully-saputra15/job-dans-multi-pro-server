const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const created = await User.create({ username, password });

      res.status(201).json({
        statusCode: 201,
        message: {
          id: created.id,
          username: created.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) throw { name: "UsernameIsRequired" };
      if (!password) throw { name: "PasswordIsRequired" };

      const user = await User.findOne({ where: { username } });

      if (!user) throw { name: "Unauthanticated" };

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) throw { name: "Unauthenticated" };

      const token = signToken({
        id: user.id,
        username: user.username,
      });

      res.status(200).json({
        statusCode: 200,
        message: {
          access_token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
