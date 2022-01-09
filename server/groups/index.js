const express = require('express');
const ramda = require('ramda');
const groupsRoutes = express.Router();
const groupsService = require('./service');

groupsRoutes.get('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const GROUPS = await groupsService.findAllByUserId(USER_ID);
    res.status(200).json(GROUPS);
});

groupsRoutes.post('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const GROUP_PAYLOAD = ramda.path(['body'], req);
    const GROUP = groupsService.create(USER_ID, GROUP_PAYLOAD);
    res.status(201).json(GROUP);
});

groupsRoutes.get('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const GROUP = await groupsService.findById(ID);
    if (GROUP) {
        res.status(200).json(GROUP);
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    groupsRoutes,
    groupsService,
};
