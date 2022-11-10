const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "default_category.jpeg" },

}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;