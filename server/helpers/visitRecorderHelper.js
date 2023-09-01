const MongoClient = require('mongodb').MongoClient;

const visitRecorder = async (req) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        const database = client.db();
        const visits = database.collection("visits");
        const result = await visits.insertOne(req.body);
        console.log(`Visitor details recorded: ${result.insertedId}`);
    } catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}

module.exports = visitRecorder;