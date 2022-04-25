const express = require('express');
const ramda = require('ramda');
const controlsRoutes = express.Router();
const controlsService = require('./service');

controlsRoutes.get('/', async (req, res) => {
    const CONTROLS = await controlsService.findAll();
    res.status(200).json(CONTROLS);
});

controlsRoutes.get('/list/:project_id', async (req, res) => {
    const PROJECT_ID = ramda.path(['params', 'project_id'], req);
    const CONTROLS = await controlsService.findAllByProjectId(PROJECT_ID);
    res.status(200).json(CONTROLS);
});

controlsRoutes.get('/details/:control_id', async (req, res) => {
    const ID = ramda.path(['params', 'control_id'], req);
    const CONTROL = await controlsService.findById(ID);
    if (CONTROL) {
        res.status(200).json(CONTROL);
    } else {
        res.status(404).json({});
    }
});

controlsRoutes.post('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const CONTROL_PAYLOAD = ramda.path(['body', 'control'], req);
    const ID = ramda.path(['id'], CONTROL_PAYLOAD);

    if (ID) {
        let control = await controlsService.findById(ID);
        if (control) {
            control = ramda.mergeLeft(CONTROL_PAYLOAD, control);
            control = await controlsService.update(control);
            res.status(201).json(control);
        } else {
            res.status(404).json(`No control definition with specified id: ${ID}`);
        }
    } else {
        const PROJECT_ID = ramda.path(['body', 'project', 'id'], req);
        const CONTROL = await controlsService.create(USER_ID, PROJECT_ID, CONTROL_PAYLOAD);
        res.status(201).json(CONTROL);
    }
});

controlsRoutes.delete('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const CONTROL = await controlsService.deleteById(ID);
    if (CONTROL) {
        res.status(200).json({id:ID});
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    controlsRoutes,
    controlsService,
};
