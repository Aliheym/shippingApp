const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.param('productId', productController.processProductId);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.checkContentType,
    productController.checkBody,
    productController.createProduct
  );

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(productController.checkContentType, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
