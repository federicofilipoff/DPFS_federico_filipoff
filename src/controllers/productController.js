const Product = require('../models/product');

module.exports = {
  list: async (req, res) => {
    const products = await Product.findAll();
    res.render('products/catalogue', { products });
  },

  detail: async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.render('products/detail', { product });
  },

  create: async (req, res) => {
    await Product.create(req.body);
    res.redirect('/admin/products');
  },

  update: async (req, res) => {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.redirect('/admin/products');
  },
};
