const ramda = require('ramda');
const express = require('express');
const devicesRoutes = express.Router();

const devicesService = require('./service');
const groupsService = require('../groups/service');

devicesRoutes.get('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const DEVICE = await devicesService.findById(ID);
    if (DEVICE) {
        res.status(200).json(DEVICE);
    } else {
        res.status(404).json({});
    }
});

devicesRoutes.get('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const DEVICES = await devicesService.findAllByUserId(USER_ID);
    const RET_VAL = [];

    for (let device of DEVICES) {
        let group_id = ramda.path(['group_id'], device);
        let group = await groupsService.findById(group_id);
        RET_VAL.push({
            ...device,
            group,
        });
    }
    res.status(200).json(RET_VAL);
});

devicesRoutes.post('/', async (req, res) => {
    const DEVICE_PAYLOAD = ramda.path(['body'], req);
    const ID = ramda.path(['id'], DEVICE_PAYLOAD);

    if (ID) {
        let DEVICE = await devicesService.findById(ID);
        if (DEVICE) {
            DEVICE = ramda.mergeLeft(DEVICE_PAYLOAD, DEVICE);
            DEVICE = await devicesService.update(DEVICE);
            res.status(201).json(DEVICE);
        } else {
            res.status(404).json(`No device found with specified id: ${ID}`);
        }
    } else {
        const USER_ID = ramda.path(['user', 'id'], req);
        const DEVICE = await devicesService.create(USER_ID, DEVICE_PAYLOAD);
        res.status(201).json(DEVICE);
    }
})

module.exports = {
    devicesRoutes,
    devicesService,
};
