const Order = require('../models/orderModel');

//for add or fetch
const fetch = async (req, res) => {
    try {
        let query = {};
        switch (req.key) {
            case undefined:
            case null: break;
            case "orderId": query = { orderId: new RegExp(req.value, 'i') }; break;
            case "customerId": query = { customerId: new RegExp(req.value, 'i') }; break;
            default: query = { [req.key]: req.value }; break;
        }
        result = await Order.find(query).sort({ _id: -1 });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).end(error.message)
        console.log(error);
    }
}

const add = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.send("Order created successfully.");
    } catch (error) {
        console.log(error);
    }
}

const update = async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.key }, req.body, { new: true });
        res.status(200).send("Order updated successfully.")
    } catch (error) {
        res.status(400).end(error.message);
        console.log(error);
    }
}

module.exports = {
    fetch,
    add,
    update
}