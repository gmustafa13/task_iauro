const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const { auth, singleAdmin, isAdmin } = require('../middleware/auth');// middleware

router.get('/getProduct', auth, productController.getProduct);
router.delete('/deleteProduct/:id', isAdmin, productController.deleteProduct);
router.patch("/updateProduct/:id",isAdmin,productController.updateProduct)


module.exports = router