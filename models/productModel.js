const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'inactive'
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timestamp: true
    });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;