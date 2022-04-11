const { MongoClient } = require("mongodb")
const MONGO_URI = "mongodb://root:password@localhost:27017"

let client = null;

const constructConnection = async () => {
    try {
        const conn = new MongoClient(MONGO_URI);
        await conn.connect();
        console.log("Connected successfully to server");
        return conn;
    } catch (err) {
        console.dir(err);
    }
}

const getMongoClient = async () => {
    if (client) {
        return client;
    } else {
        client = await constructConnection();
        return client;
    }
}

module.exports = {
    getMongoClient
}