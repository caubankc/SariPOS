const Product = require('../models/productModel.js');

const list = async (req, res) => {
 
    try {
        var result;
        if (req.id) {
            result = await Product.findById(req.id);
        } else {
            result = await Product.find();
        }
        res.status(200).send(result)
    } catch(error) {
        res.status(500);
        res.end("Fatal error.")
        console.log(error);
    }
}

const add = async (req, res) => {
    try {
        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send("Product created successfully.")
    } catch(error) {
        res.status(500);
        res.end("Fatal error.")
        console.log(error);
    }
}

module.exports = {
    list,
    fetch,
    add
}