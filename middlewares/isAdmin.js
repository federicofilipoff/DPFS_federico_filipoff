module.exports = (req, res, next) => {

    // Verificar si el usuario está autenticado
    if (!req.session.user) {
        return res.redirect('/users/login');
    }

    // Verificar si el usuario es admin
    if (req.session.user.category !== 'admin') {
        return res.status(403).send('Acceso único para Administradores.');
    }

    // Si el usuario es admin: continuar con la solicitud.
    next();
};
