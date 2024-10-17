// Se crean los controladores: cada llave contiene una función (controlador)

let userController = {
    index: function(req, res, next) {
        res.send('Ruta RAIZ - USUARIO');
    },
    show: function(req, res) {
        return res.send(`Ruta SHOW - USUARIO ${req.params.id}`)
    }
};

module.exports = userController;