const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    price: { type: Number, default: 0.00 },
    stock: { type: Number, default: 0 },
    barcode: { type: String, default: "nobarcode" },
    image: { type: String, default: "default_product.png" },
    status: { type: String, default: "inactive" }

}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;