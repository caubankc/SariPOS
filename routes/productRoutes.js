const express = require('express');
const { fetch, add, update, remove } = require('../controllers/productController.js');
const productRouter = express.Router();

productRouter.get("/", fetch);
productRouter.post("/", add);
productRouter.put("/", update);
productRouter.delete("/", remove);

module.exports = productRouter;