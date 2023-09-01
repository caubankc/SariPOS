const express = require('express');
const { fetch, add, update } = require('../controllers/orderController.js');
const orderRouter = express.Router();

orderRouter.get("/", fetch);
orderRouter.post("/", add);
orderRouter.put("/", update);
// orderRouter.delete("/", remove);

module.exports = orderRouter;