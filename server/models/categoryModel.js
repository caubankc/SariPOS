const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    display_text: { type: String, required: true },
    image: { type: String, default: "default_category.png" },
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;