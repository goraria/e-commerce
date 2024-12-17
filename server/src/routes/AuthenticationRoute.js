const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');
const AdministratorMiddleware = require('../middleware/AdministratorMiddleware');

// router.post('/login/authen', AuthenticationController.login.bind(AuthenticationController))
router.post('/google', AuthenticationController.google)

router.post('/login', AuthenticationController.login)

router.post('/register', AuthenticationController.register)

router.post('/logout', AuthenticationMiddleware, AuthenticationController.logout);

router.get('/check', AuthenticationMiddleware, AuthenticationController.check)

router.get('/verify-email', AuthenticationController.verifyEmail)


router.post('/forgot-password', AuthenticationController.ForgotPassword);
router.post('/reset-password', AuthenticationController.ResetPassword);
router.post('/change-password', AuthenticationController.changePassword);
module.exports = router