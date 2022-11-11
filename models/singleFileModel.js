const mongoose = require('mongoose');

const singleFileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, { timestamps: true });

const SingleFile = mongoose.model('SingleFile', singleFileSchema);
module.exports = SingleFile