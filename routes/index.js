var express = require('express');
var router = express.Router();

// Importar productos
const productList = require('../data/products.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { products: productList });
});

module.exports = router;
