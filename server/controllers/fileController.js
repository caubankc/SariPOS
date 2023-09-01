const SingleFile = require('../models/singleFileModel');
const fs = require('fs');

const fetch = async (req, res, next) => {
    try {
        let result = [];
        if (req.path == null) {
            result = await SingleFile.find()
        } else {
            result = await SingleFile.find({ filePath: req.path });
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).end("Fatal error.")
        console.log(error);
    }
}

const add = async (req, res, next) => {
    console.log(JSON.stringify(req.file));
    try {
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        res.status(201).send('File uploaded successfully.');
    } catch (error) {
        res.status(400).end(error.message);
        console.log(error);
    }
}

const remove = async (req, res, next) => {
    try {
        await SingleFile.findOneAndDelete({ filePath: req.path })
        // Delete actual file
        fs.unlink(req.path, (err) => {
            if (err) {
                console.error(err);
            }
        })
        res.status(201).send('File deleted successfully.');
    } catch {
        res.status(400).end(error.message);
    }

}

module.exports = {
    fetch,
    add,
    remove
}