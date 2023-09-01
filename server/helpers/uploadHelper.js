const multer = require('multer');
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuid())
    }
})

const fileFilter = (req, file, cb) => {
    if (file.size <= 1024 * 1024 * 1) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter
    }
);

module.exports = { upload };
