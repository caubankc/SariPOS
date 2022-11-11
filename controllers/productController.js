const Product = require('../models/productModel');

const fetch = async (req, res) => {
    try {
        let result = [];
        if (req.key == null) {
            result = await Product.find()
        } else if (req.key == 'id') {
            result = await Product.findById(req.value);
        } else if (req.key) {
            result = await Product.find()
                .where(req.key).equals(req.value);
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).end("Fatal error.")
        console.log(error);
    }
}

const add = async (req, res) => {
    try {
        // req.body.image = req.file.path;
        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send("Product created successfully.")
    } catch (error) {
        res.status(500).end("Fatal error.")
        console.log(error);
    }
}

const update = async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.key }, req.body, { new: true })
        res.status(200).send("Product updated successfully.")
    } catch (error) {
        res.status(400).end("Fatal error.")
        console.log(error);
    }
}

const remove = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.key })
        res.status(200).send("Product updated successfully.")
    } catch (error) {
        res.status(400).end("Fatal error.")
        console.log(error);
    }
}

module.exports = {
    fetch,
    add,
    update,
    remove
}