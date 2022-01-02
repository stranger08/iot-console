const ramda = require('ramda');
const express = require('express');
const controlRoutes = express.Router();

const { devicesService } = require('../devices');

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

    DEVICE.data.push({
        received: new Date(),
        ...DATA,
    });

    DEVICE = await devicesService.update(DEVICE);

    console.log(`Data exchange transaction completed for the device ${DEVICE_ID}`);

    res.status(200).json({
        commands: [],
    });
});

module.exports = {
    controlRoutes
};
