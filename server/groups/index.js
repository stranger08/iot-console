const express = require('express');
const ramda = require('ramda');
const groupsRoutes = express.Router();
const groupsService = require('./service');

groupsRoutes.get('/', async (req, res) => {
    const PROJECT_ID = ramda.path(['query', 'project'], req);
    const GROUPS =  await groupsService.findAllByProject(PROJECT_ID);
    res.status(200).json(GROUPS);
});

groupsRoutes.post('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const PROJECT_ID = ramda.path(['query', 'project'], req);
    const GROUP_PAYLOAD = ramda.path(['body'], req);
    const GROUP = groupsService.create(USER_ID, PROJECT_ID, GROUP_PAYLOAD);
    res.status(201).json(GROUP);
});

groupsRoutes.get('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const RESULT = await groupsService.findById(ID);
    if (RESULT) {
        res.status(200).json(RESULT);
    } else {
        res.status(404).json({});
    }
});

groupsRoutes.delete('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const GROUP = await groupsService.deleteById(ID);
    if (GROUP) {
        res.status(200).json({id:ID});
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    groupsRoutes,
    groupsService,
};
