const express = require('express');
const usersRoutes = express.Router();
const usersService = require('./service');

usersRoutes.get('/', async (req, res) => {
    const USERS = await usersService.findAll();
    res.status(200).json(USERS);
});

usersRoutes.post('/', async (req, res) => {
    const USER = usersService.create(req.body);
    res.status(201).json(USER);
});

usersRoutes.get('/:email', async (req, res) => {
    const EMAIL = ramda.path(['params', 'email'], req);
    const USER = await usersService.findByEmail(EMAIL);
    if (USER) {
        res.status(200).json(USER);
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    usersRoutes,
    usersService,
};
