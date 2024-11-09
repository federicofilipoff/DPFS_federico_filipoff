// Por si solas las validaciones (/validators/) no se muestran al usuario,
// se deben asociar a la ruta como middleware y enviar por controlador.
const { validationResult } = require('express-validator');
const db = require('../database/models') // "db" contiene todos los modelos
const bcrypt = require('bcrypt'); // encriptar contraseña ("hashing")

// CREAR OBJETO CON LOS CONTROLADORES
let usersController = {

    index: function(req, res) {
        db.User.findAll()
        .then(function(data) {
            return res.send(data);
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error al obtener datos');
        });
    },
    // ------------------------------------------------------------------------
    login: function(req, res) {
        return res.render('users/login');
    },
    // ------------------------------------------------------------------------
    authenticate: function(req, res) {
        
        // Crear contenedor de errores (validaciones)
        const result = validationResult(req);
        
        // Si hay errores envia una respuesta con los errores.
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { email, password, rememberMe } = req.body;

        // Buscar usuario por email usando Sequelize
        db.User.findOne({where: { email: email }})
        .then(function(data) {

            // Si el usuario es encontrado y la contraseña es correcta
            if (data && bcrypt.compareSync(password, data.password)) {

                // Guardar datos de sesión
                req.session.user = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    category: data.category,
                    profileImage: data.profileImage
                };

                // Si el usuario elige ser recordado: configurar la cookie
                if (rememberMe) {
                    // Expira en 7 días
                    res.cookie('rememberMe', data.id, { maxAge: 7 * 24 * 60 * 60 * 1000 });
                }

                return res.redirect(`/users/${data.id}`);
            } else {
                return res.redirect('/users/login');
            }
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error: usuario no encontrado');
        });
    },
    // ------------------------------------------------------------------------
    logout: function(req, res) {
        req.session.destroy();
        return res.redirect('/users/login');
    },
    // ------------------------------------------------------------------------
    create: function(req, res) {
        return res.render('users/register');
    },
    // ------------------------------------------------------------------------
    store: function (req, res) {

        // Crear contenedor de errores (validaciones)
        const result = validationResult(req);
        
        // Si hay errores envia una respuesta con los errores.
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        // Obtener datos del formulario
        const { firstName, lastName, email, password, category } = req.body;

        // Verificar que el correo no exista previamente
        db.User.findOne({ where: { email: email } })
        .then(function(data) {
            if (data) { 
                // Si el usuario ya existe
                return res.status(400).send('Error: El correo ya fue registrado.');
            } else {
                // Encriptar la contraseña
                const hashedPassword = bcrypt.hashSync(password, 10);
    
                // Crear un nuevo usuario con los datos proporcionados
                const nuevoUsuario = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    category: category,
                    profileImage: req.file ? `${req.file.filename}` : null
                };
    
                return db.User.create(nuevoUsuario)
                .then(function() {
                    return res.redirect('/users/login');
                });
            }
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error: usuario no creado');
        });
    },
    // ------------------------------------------------------------------------
    show: function(req, res) {

        // Obtener el ID del usuario desde la sesión
        const userId = parseInt(req.session.user.id);
        
        db.User.findByPk(userId)
        .then(function(data) {
            return res.render('users/profile', { data });
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Usuario no encontrado');
        });
    },
    // ------------------------------------------------------------------------
    edit: function(req, res) {
        // Obtener el ID del usuario desde la sesión
        const userId = req.session.user.id;
    
        // Verificar si el usuario está autenticado
        if (userId) {
            db.User.findByPk(userId)
            .then(function(data) {
                // Verificar si se encontró el usuario
                if (!data) {
                    return res.status(404).send('Usuario no encontrado');
                }
                return res.render('users/edit', { data });
            })
            .catch(function(e) {
                console.log(e);
                return res.status(500).send('Error al obtener el usuario');
            });
        } else {
            // Redirigir a la página de login si el usuario no está autenticado
            return res.redirect('/users/login');
        }
    },
    // ------------------------------------------------------------------------
    update: function(req, res) {
        const userId = req.session.user.id;

        // Crear contenedor de errores (validaciones)
        const result = validationResult(req);
        
        // Si hay errores envia una respuesta con los errores.
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        // Obtener los datos del formulario
        const { firstName, lastName, email, passwordEdit } = req.body;
        const updates = {};
    
        // Solo agregar los campos que no están vacíos
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
        if (req.file) {updates.profileImage = req.file.filename};   
        if (passwordEdit) {updates.password = bcrypt.hashSync(passwordEdit, 10)};
    
        // Verificar que el email no esté en uso por otro usuario
        db.User.findOne({
            where: {
                email: email,
                id: { [db.Sequelize.Op.ne]: userId }
            }
        })
        .then(function(existingUser) {
            if (existingUser) {
                // Si otro usuario ya tiene el mismo email
                return res.status(400).send('Error: El email ya está en uso por otro usuario.');
            } else {
                // Actualizar el usuario en la base de datos con los campos modificados
                return db.User.update(updates, { where: { id: userId } });
            }
        })
        .then(function() {
            // Redirigir al perfil del usuario después de actualizar
            return res.redirect(`/users/${userId}`);
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error al actualizar el usuario');
        });
    },
    // ------------------------------------------------------------------------
    delete: function(req, res) {

    // Obtener ID de la sesión del usuario
    const userId = req.session.user.id;
    
    db.User.destroy({ where: { id: userId } })
    .then(function(deletedCount) {
        // Si se elimina el registro
        if (deletedCount === 1) {
            return res.redirect('/users/logout');
        }
        // Si no se elimina el registro
        else {
            return res.status(404).send('Usuario no encontrado');
        }
    })
    .catch(function(e) {
        console.log(e);
        return res.status(500).send('Error al eliminar el usuario');
    });
    }
};

module.exports = usersController;
