const db = require('../config/db');

const getAllProducts = (callback) => {
  db.query('SELECT * FROM products', callback);
};

const getProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

const createProduct = (product, callback) => {
  const sql = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [product.name, product.description, product.price, product.image], callback);
};

const updateProduct = (id, product, callback) => {
  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?';
  db.query(sql, [product.name, product.description, product.price, product.image, id], callback);
};

const deleteProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE id = ?', [id], callback);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
