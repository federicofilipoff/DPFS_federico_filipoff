const path = require('path')
const bcrypt = require('bcrypt');
const User = require(path.join('..', 'models', 'User'));

// PROCESAR LOGIN (POST)
exports.iniciarSesion = async function (req, res) {
    const { email, password, remember } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const usuario = await User.findOne({ where: { email } });
    
        if (!usuario) {
            // Si no se encuentra el usuario, redirigir al login con un error
            return res.render('user/login', { error: 'Usuario no encontrado' });
        }
    
        // Verificar que la contraseña sea correcta
        const isMatch = await bcrypt.compare(password, usuario.password);
    
        if (!isMatch) {
            // Si la contraseña es incorrecta, redirigir al login con un error
            return res.render('user/login', { error: 'Contraseña incorrecta' });
        }

        // Almacenar informacion de la sesión del usuario
        req.session.user = usuario;

        // Configurar la cookie: recordar por tiempo determinado
        req.session.cookie.maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

        // Redirigir al home (inicio) en caso de éxito
        return res.redirect('/');
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

//PROCESAR LOGOUT
exports.cerrarSesion = async function (req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrarar sesión' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/');
    });
};

// CREAR USUARIO
exports.crearUsuario = async function (req, res) {
    try {
        const { firstName, lastName, email, password, category } = req.body;
        const image = req.file ? req.file.filename : null;

        // Crear un nuevo usuario
        const nuevoUsuario = await User.create({
            firstName,
            lastName,
            email,
            password,
            category,
            image
        });

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });

    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: err.message });
    }

};