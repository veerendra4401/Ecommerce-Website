const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById,
  createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', createProduct);      // TODO: add authMiddleware
router.put('/:id', updateProduct);    // TODO: add authMiddleware
router.delete('/:id', deleteProduct); // TODO: add authMiddleware

module.exports = router;
