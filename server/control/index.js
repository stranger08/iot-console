const express = require('express');
const controlRoutes = express.Router();

const { findDeviceById } = require('../devices');

controlRoutes.post('/exchange', (req, res) => {

    const DEVICE_ID = req.body.deviceId;

    if (!DEVICE_ID) {
        res.status(400).json({'status': 'Device ID required.'});
        return;
    }

    const DATA = req.body.data;

    if (!DATA) {
        res.status(400).json({'status': 'Incoming data required.'});
        return;
    }

    const DEVICE = findDeviceById(DEVICE_ID);

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

    res.status(200).json({
        commands: [],
    });
});

module.exports = {
    controlRoutes
};
