const db = require("../database/models");

const rememberMiddleware = async (req, res, next) => {
  if (req.cookies.rememberMe && !req.session.user) {
    try {
      const user = await db.User.findByPk(req.cookies.rememberMe);

      if (user) {
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          category: user.category,
          profileImage: user.profileImage,
        };
      }
    } catch (error) {
      console.error("Error restaurando sesión desde cookie:", error);
    }
  }
  next();
};

module.exports = rememberMiddleware;
