/*
Se crea un objeto que contiene los controladores.
Cada llave contiene una función (controlador).
El controlador contiene la plantilla que renderiza y puede incluir variables.
*/

let userController = {
    // index: function(req, res, next) {
    //     res.send('Ruta raiz de usuarios');
    // },
    // show: function(req, res) {
    //     return res.send(`Ruta SHOW - USUARIO ${req.params.id}`)
    // },
    login: function(req, res) {
        return res.render('users/login')
    },
    register: function(req, res) {
        return res.render('users/register')
    }
};

module.exports = userController;
