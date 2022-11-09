const express = require('express');
const productController = require('../controllers/productController.js');

const productRouter = express.Router();

productRouter.get("/", productController.fetch);
productRouter.post("/", productController.add);
productRouter.put("/", productController.update);
productRouter.delete("/", productController.remove);

module.exports = productRouter;