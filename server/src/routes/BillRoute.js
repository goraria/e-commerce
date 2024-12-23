const express = require('express');
const router = express.Router();
const BillController = require('../controllers/BillController')
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.get('/list-all', BillController.getAllBill);

router.get('/list-bill', AuthenticationMiddleware, BillController.getAllBillByAccount);

router.get('/get-bill/:id', AuthenticationMiddleware, BillController.getBillById);

router.put('/add-bill',AuthenticationMiddleware ,BillController.createBill);

router.put('/add-billDetail', BillController.createBillDetail);

// router.get('/list', AuthenticationMiddleware, BillController.getAllBillByAccount);

// router.get('/read:id', BillController.getBillById);

module.exports = router;
