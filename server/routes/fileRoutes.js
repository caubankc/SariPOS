const express = require('express');
const { upload } = require('../helpers/uploadHelper');
const { fetch, add, remove } = require('../controllers/fileController');
const fileRouter = express.Router();

fileRouter.get("/", fetch);
fileRouter.post("/", upload.single('file'), add);
fileRouter.delete("/", remove);

module.exports = fileRouter;