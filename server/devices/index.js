const ramda = require('ramda');
const express = require('express');
const devicesRoutes = express.Router();

const devicesService = require('./service');
const { usersService } = require('../users');

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
    res.status(200).json(DEVICES);
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
