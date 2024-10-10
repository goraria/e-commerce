const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.get('/addresses', AddressController.getAllAddresses);

router.get('/addresses/:id', AddressController.getAddressById);

module.exports = router;
