const ramda = require('ramda');
const express = require('express');
const controlRoutes = express.Router();

const { devicesService } = require('../devices');
const { controlsService } = require('../controls');
const { applyControl } = require('../controls/apply');
const { captureDeviceData } = require('./service');
const e = require('express');

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

controlRoutes.get('/settings/:device_id', async (req, res) => {
    try {
        const DEVICE_ID = ramda.path(['params', 'device_id'], req);

        if (!DEVICE_ID) {
            res.status(400).json({'status': 'Device ID required.'});
            return;
        }

        let device = await devicesService.findById(DEVICE_ID);

        if (!device) {
            res.status(400).json({'status': 'Device ID is not registered at the system.'});
            return;
        }

        const CONTROL_RULES_AFFECTING_DEVICE = await controlsService.findAllByAffectedDeviceId(DEVICE_ID);

        for (let controlRule of CONTROL_RULES_AFFECTING_DEVICE) {
            let controlId = ramda.path(['control_id'], controlRule);
            let isControlRuleApplied = await applyControl(controlId);

            if (isControlRuleApplied) {
                console.log(`Control rule ${controlId} has been applied`);
            } else {
                console.log(`Control rule ${controlId} has not been applied`);
            }
            
        }


        device = await devicesService.findById(DEVICE_ID);
        res.status(200).json({
            device: device
        });
    } catch (error) {
        console.error(`Error (controlRouter.settings): ${error}`);
        res.status(500).json({ error });
    }
});

module.exports = {
    controlRoutes
};
