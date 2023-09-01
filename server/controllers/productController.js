const Product = require('../models/productModel');

const fetch = async (req, res) => {
    try {
        let query = {};
        switch (req.key) {
            case undefined:
            case null: break;
            case "id": query = { _id: req.value }; break;
            case "name": query = { name: new RegExp(req.value, 'i') }; break;
            case "shop": query = { status: "active", category: req.value }; break;
            default: query = { [req.key]: req.value }; break;
        }
        result = await Product.find(query).sort({ _id: -1 });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).end(error.message)
        console.log(error);
    }
}

const add = async (req, res) => {
    try {
        // req.body.image = req.file.path;
        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send(newProducts);
    } catch (error) {
        res.status(400).end(error.message);
        console.log(error.message);
    }
}

const update = async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.key }, req.body, { new: true });
        res.status(200).send("Product updated successfully.")
    } catch (error) {
        res.status(400).end(error.message);
        console.log(error);
    }
}

const remove = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.key })
        res.status(200).send("Product removed successfully.")
    } catch (error) {
        res.status(400).end(error.message)
        console.log(error);
    }
}

module.exports = {
    fetch,
    add,
    update,
    remove
}