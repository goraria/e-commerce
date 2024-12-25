// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
// const path = require('path');
const AccountController = require('../controllers/AccountController');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

// router.use(express.static(path.join(__dirname, 'client/public')));

router.get('/get-info', AuthenticationMiddleware, AccountController.getAccountInfo);
router.put('/set-info', AuthenticationMiddleware, AccountController.setAccountInfo);

router.post('/upload-avatar', AuthenticationMiddleware, upload.single('avatar'), AccountController.UploadAvatar);
module.exports = router;
