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
    const PROJECT_ID = ramda.path(['query', 'project'], req);
    const DEVICES = await devicesService.findAllByUserNProject(USER_ID, PROJECT_ID);
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
        const PROJECT_ID = ramda.path(['query', 'project'], req);
        const DEVICE = await devicesService.create(USER_ID, PROJECT_ID, DEVICE_PAYLOAD);
        res.status(201).json(DEVICE);
    }
});

devicesRoutes.delete('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const RESULT = await devicesService.deleteById(ID);
    if (RESULT) {
        res.status(200).json({id:ID});
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    devicesRoutes,
    devicesService,
};
