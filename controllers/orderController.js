const Order = require('../models/orderModel');

//for add or fetch
const fetch = async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (error) {
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

const cancel = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.send("Order created successfully.");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetch,
    add,
    cancel
}