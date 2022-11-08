const express = require('express');
const productController = require('../controllers/productController.js');

const productRouter = express.Router();

productRouter.get("/", productController.list);
productRouter.post("/", productController.add);

module.exports = productRouter;