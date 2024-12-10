module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    return res.redirect("/users/login");
  },

  isGuest: (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    return res.redirect(`/users/${req.session.user.id}`);
  },
};
