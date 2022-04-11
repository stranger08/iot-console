const { getMongoClient } = require('../dbclient/mongo-provider');

const recordDeviceData = async (device, data, timestamp) => {
    const CLIENT = await getMongoClient();
    const DB = CLIENT.db();
    const COLLECTION = DB.collection('data');
    COLLECTION.insertOne({device, data, timestamp });
}

const captureDeviceData = () => {
    // TODO this should filter out what to look for by device telemetry configuration.
}

module.exports = {
    recordDeviceData,
    captureDeviceData,
}