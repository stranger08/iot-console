const { MongoClient } = require("mongodb");
const config = require('../config');

let client = null;

const constructConnection = async () => {
    const configuration = await config();
    try {
        const conn = new MongoClient(configuration.MONGO_URI);
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