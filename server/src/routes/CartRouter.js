const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

// Route để lấy tất cả người dùng
// router.get('/load-cart', cartController.loadCart);
// router.get('/load-cart/:idCart', cartController.loadCartById);

router.get('/load-cart', AuthenticationMiddleware , cartController.loadCartPro);

router.get('/loadcart', AuthenticationMiddleware , cartController.loadCart);

router.get('/load-cartItem/:idCart', cartController.loadCartItem);

router.put('/add-cartitem', cartController.addCartItem);

router.put('/remove-cartitem', cartController.removeCartItem);

router.put('/update-cartitem', cartController.updateCartItemQuantity);

module.exports = router;