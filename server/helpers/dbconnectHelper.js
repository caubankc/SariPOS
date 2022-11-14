const mongoose = require('mongoose');

const connect = (MONGODB_URI) => {
    mongoose.connect(MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err.message);
    });
}

module.exports = connect;