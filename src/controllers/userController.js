const path = require('path')
const User = require(path.join('..', 'models', 'User'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// [1] LEER USUARIOS
exports.visualizarUsuarios = async function (req, res) {
    try {
        const usuarios = await User.findAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
};

// [2] LEER USUARIO SEGÚN SU ID
exports.visualizarUsuario = async function (req, res) {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado (ID inexistente)');
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
};

// [3] FORMULARIO PARA CREAR USUARIO
exports.formularioCrearUsuario = async function (req, res) {
    res.render(path.join(__dirname, '..', 'views', 'users', 'register.ejs'))
};

// [4] CREAR USUARIO
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

// [5] FORMULARIO EDITAR USUARIO
exports.formularioEditarUsuario = async function (req, res) {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render(path.join(__dirname, '..', 'views', 'users', 'editar.ejs'), { usuario });
    } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
};

// [6] EDITAR USUARIO
exports.editarUsuario = async function (req, res) {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        const { firstName, lastName, email, password, category } = req.body;
        await usuario.update({ firstName, lastName, email, password, category });
        res.json(usuario);
    } catch (err) {
        res.status(500).send('Error al actualizar el usuario');
    }
};

// [7] ELIMINAR USUARIO
exports.eliminarUsuario = async function (req, res) {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        await usuario.destroy();
        res.status(200).send('Usuario eliminado');
    } catch (err) {
        res.status(500).send('Error al eliminar el usuario');
    }
};

// ACCEDER USUARIO (GET)
exports.formularioAccesoUsuario = async function (req, res) {
    res.render(path.join(__dirname, '..', 'views', 'users', 'login.ejs'))
};

// PROCESAR LOGIN (POST)
exports.iniciarSesion = async function (req, res) {
    const { email, password, remember } = req.body;
    
    try {
        // Buscar al usuario en la base de datos
        const usuario = await User.findOne({ where: { email } });
    
        if (!usuario) {
            // Si no se encuentra el usuario, redirigir al login con un error
            return res.render('users/login', { error: 'Usuario no encontrado' });
        }
    
        // Verificar que la contraseña sea correcta
        const isMatch = await bcrypt.compare(password, usuario.password);
    
        if (!isMatch) {
            // Si la contraseña es incorrecta, redirigir al login con un error
            return res.render('users/login', { error: 'Contraseña incorrecta' });
        }
    
        // Si las credenciales son correctas, generar el token JWT
        const token = jwt.sign({
            id: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            email: usuario.email
        }, 'secreto', { expiresIn: remember ? '30d' : '1d' });

        // Guardar el token en una cookie
        res.cookie('token', token, { httpOnly: true, maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 });

        // Redirigir al home (inicio) en caso de éxito
        return res.redirect('/');
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return res.status(500).send('Error interno del servidor');
    }
};
  
// PERFIL DEL USUARIO
exports.perfilUsuario = async function (req, res) {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    res.render(path.join(__dirname, '..', 'views', 'users', 'profile.ejs'), { user: req.user });
};

//PROCESAR LOGOUT
exports.cerrarSesion = async function (req, res) {
    res.clearCookie('token');
    res.redirect('/');
};
