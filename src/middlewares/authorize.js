module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/users/login");
    }

    if (req.session.user.category !== requiredRole) {
      return res.status(403).send("Acceso denegado: permisos insuficientes.");
    }

    // Si el usuario tiene los permisos adecuados, continuar
    next();
  };
};
