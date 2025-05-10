const Product = require('../models/Product');

exports.getProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) return res.status(500).json({ error: err });
    res.json(products);
  });
};

exports.getProductById = (req, res) => {
  Product.getProductById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
};

exports.createProduct = (req, res) => {
  Product.createProduct(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Product created', id: result.insertId });
  });
};

exports.updateProduct = (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Product updated' });
  });
};

exports.deleteProduct = (req, res) => {
  Product.deleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Product deleted' });
  });
};
