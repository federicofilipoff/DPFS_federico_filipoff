module.exports = {
  // Middleware para acceder únicamente con sesión (login)
  isAuthenticated: (req, res, next) => {
    // El usuario está autenticado: continuar
    if (req.session.user) {
      return next();
    }

    // Redirigir al login si no está autenticado
    return res.redirect("/users/login");
  },

  // Middleware para acceder sin sesión
  isGuest: (req, res, next) => {
    // El usuario no está autenticado: continuar
    if (!req.session.user) {
      return next();
    }

    // Redirigir al perfil si ya está autenticado
    return res.redirect(`/users/${req.session.user.id}`);
  },
};
