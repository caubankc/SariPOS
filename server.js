const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connect = require('./helpers/dbconnectHelper');
const visitRecorder = require('./helpers/visitRecorderHelper');
const productRouter = require('./routes/productRoutes');
const path = require('path');
const fileRouter = require('./routes/fileRoutes');
const orderRouter = require('./routes/orderRoutes');

dotenv.config();
connect(process.env.MONGODB_URI);
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use("/api/products/:key?/:value?", (req, res) => {
    req.value = req.params.value;
    req.key = req.params.key;
    productRouter(req, res);
});

app.use("/api/orders/:key?/:value?", (req, res) => {
    req.value = req.params.value;
    req.key = req.params.key;
    orderRouter(req, res);
});

app.use("/api/files/:key?", (req, res) => {
    req.path = req.params.key;
    fileRouter(req, res);
});

//app.use('/api/files', fileRouter);

app.use("/api/visits", (req, res) => {
    visitRecorder(req);
});

// create port
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// listen
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
});

