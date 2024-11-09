var express = require('express');
var router = express.Router();

// Importar "db" contiene todos los modelos
const db = require('../database/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Product.findAll({
        // Combinar tablas para obtener nombre de marca y categoría, sino renderizo el ID.
        include: [
            {
                model: db.Brand,
                attributes: ['name'],
            },
            {
                model: db.Category,
                attributes: ['name'],
            }
        ],
    })
    .then(products => {
      res.render('index', { products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error al obtener productos');
    });
});

module.exports = router;
