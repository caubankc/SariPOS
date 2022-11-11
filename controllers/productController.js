const Product = require('../models/productModel');

const fetch = async (req, res) => {
    try {
        let result = [];
        if (req.key == null) {
            result = await Product.find().sort({ _id: -1 })
        } else if (req.key == 'id') {
            result = await Product.findById(req.value);
        } else if (req.key == 'name') {
            result = await Product.find({ name: new RegExp(req.value, 'i') }).sort({ _id: -1 });
        } else if (req.key) {
            result = await Product.find()
                .where(req.key).equals(req.value);
        }
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