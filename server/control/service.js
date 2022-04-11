const { getMongoClient } = require('../dbclient/mongo-provider');
const lodash = require('lodash');

const recordDeviceData = async (device, data, timestamp) => {
    const CLIENT = await getMongoClient();
    const DB = CLIENT.db();
    const COLLECTION = DB.collection('data');
    COLLECTION.insertOne({device, data, timestamp });
}

const captureDeviceData = async (device, data, timestamp) => {
    const DEVICE_DATA_SETTINGS = device.telemetry || [];
    const DEVICE_DATA_PATHS = DEVICE_DATA_SETTINGS.map(t => t.path);
    const CAPTURED_DATA = lodash.pick(data, DEVICE_DATA_PATHS);
    await recordDeviceData(device, CAPTURED_DATA, timestamp);
}

module.exports = {
    recordDeviceData,
    captureDeviceData,
}