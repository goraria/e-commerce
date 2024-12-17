const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Route để lấy tất cả người dùng
router.get('/load-product', productController.loadProduct);
router.get('/load-productid/:idProduct', productController.loadProductWithID);
router.get('/load-description/:idProduct', productController.loadDescription);
router.get('/load-configuration/:idProduct', productController.loadConfiguration);
router.get('/load-rating/:idProduct', productController.loadRating);
router.get('/load-color/:idProduct', productController.loadColor);
router.get('/load-idconfiguration/:idConfiguration', productController.loadConfigurationByID);
router.get('/load-productCPU/:CPU', productController.loadProductWithCondition);
router.get('/load-productBrand/:Brand', productController.loadProductWithBrand);
router.get('/load-productName/:Name', productController.loadProductWithName);

router.post('/update-productname/:idProduct', productController.updateProductName);
router.delete('/delete-productname/:idProduct', productController.deleteProductName);
router.put('/create-productname', productController.createProductName);

module.exports = router;