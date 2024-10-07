const path = require('path')
const User = require(path.join('..', 'models', 'User'));

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
        const usuario = req.session.user;
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

// PERFIL DEL USUARIO
exports.perfilUsuario = async function (req, res) {
    res.render(path.join(__dirname, '..', 'views', 'users', 'profile.ejs'), { user: req.session.user });
};
