const mongoose = require("mongoose");
const orderId = require('order-id')('key');
const { generateCustomerId } = require('../helpers/idHelper');

const orderSchema = new mongoose.Schema({

    orderId: { type: String, default: orderId.generate(), required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: Number, required: true },
    customerAddress: { type: String, required: true },
    subTotal: { type: Number, required: true },
    totalSales: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: { type: Array, required: true }

}, {
    timestamps: true
});

// computed field customerId
orderSchema.virtual('customerId').get(function () {
    return generateCustomerId(this.customerName);
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;