const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: { type: String, required: true },
    customerPhone: { type: Number, required: true },
    customerAddress: { type: String, required: true },
    subTotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: { type: Array, required: true }

}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;