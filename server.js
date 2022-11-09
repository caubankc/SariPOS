const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRoutes.js');
const MongoClient = require('mongodb').MongoClient;

// require('colors');

dotenv.config();

// Connect with Mongo DB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use("/api/products/:key?/:value?", (req, res) => {
    req.value = req.params.value;
    req.key = req.params.key;
    //console.log(req.method);
    //console.log(req.key);
    productRouter(req, res);
});

app.use("/api/visits", (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    async function run() {
        try {
            const database = client.db();
            const visits = database.collection("visits");
            const result = await visits.insertOne(req.body);
            console.log(`Visitor details recorded: ${result.insertedId}`);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
})

// create port
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// listen
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
});

