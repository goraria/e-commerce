const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/get-category', CategoryController.getCategory);
router.delete('/delete-category/:id', CategoryController.deleteCategory);
router.put('/update-category/:id', CategoryController.updateCategory);
router.post('/create-category', CategoryController.createCategory);

module.exports = router;