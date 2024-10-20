const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// IMPORTAR DATOS
const usersList = require('../data/users.json');

// CREAR OBJETO CON LOS CONTROLADORES
let usersController = {

    index: function(req, res) {
        return res.send(usersList);
    },
    login: function(req, res) {
        return res.render('users/login');
    },
    authenticate: function(req, res) {
        const { email, password, rememberMe } = req.body;
        const user = usersList.find(u => u.email === email);

        // Si el usuario es encontrado y la contraseña es correcta
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                category: user.category
            };

            // Si el usuario elige ser recordado: configurar la cookie
            if (rememberMe) {
                res.cookie('rememberMe', user.id, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 semana
            }
            
            return res.redirect(`/users/${user.id}`);
        } else {
            // Si hay un error
            return res.redirect('/users/login');
        }
    },
    logout: function(req, res) {
        req.session.destroy();
        return res.redirect('/users/login');
    },
    create: function(req, res) {
        return res.render('users/register');
    },
    store: function (req, res) {
        // Manejar los datos del formulario
        const { firstName, lastName, email, password, category } = req.body;

        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Crear un nuevo usuario con los datos proporcionados
        let newUser = {
            id: usersList.length > 0 ? Math.max(...usersList.map(u => u.id)) + 1 : 1, 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            category: category,
            profileImage: req.file ? `/images/users/${req.file.filename}` : null
        };

        // Guardar el nuevo usuario en el archivo JSON
        let usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        // Redirigir al perfil o a la lista de usuarios
        return res.redirect(`/users/login`);
    },
    profile: function(req, res) {
        // Obtener el ID del usuario desde los parámetros
        const userId = parseInt(req.params.id);

        // Buscar el usuario en la lista de usuarios
        const user = usersList.find(u => u.id === userId);
        if (user) {
            return res.render('users/profile', { user });
        } else {
            return res.status(404).send('Usuario no encontrado');
        }
    }
};

module.exports = usersController;
