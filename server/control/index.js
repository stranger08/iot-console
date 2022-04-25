const ramda = require('ramda');
const express = require('express');
const controlRoutes = express.Router();

const { devicesService } = require('../devices');
const { captureDeviceData } = require('./service');

controlRoutes.post('/exchange', async (req, res) => {

    const DEVICE_ID = ramda.path(['body', 'deviceId'], req);

    if (!DEVICE_ID) {
        res.status(400).json({'status': 'Device ID required.'});
        return;
    }

    const DATA = ramda.path(['body', 'data'], req);

    if (!DATA) {
        res.status(400).json({'status': 'Incoming data required.'});
        return;
    }

    let DEVICE = await devicesService.findById(DEVICE_ID);

    if (!DEVICE) {
        res.status(400).json({'status': 'Device ID is not registered at the system.'});
        return;
    }

    if (!DEVICE.data) {
        DEVICE.data = [];
    }

    let received = new Date();
    captureDeviceData(DEVICE, DATA, received);

    console.log(`Data exchange transaction completed for the device ${DEVICE_ID}`);

    res.status(200).json({
        commands: [],
    });
});

module.exports = {
    controlRoutes
};
