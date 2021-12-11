const USERS = [
    {
        id: "0000-0000-0000-0001",
        email: 'admin',
        password: 'test',
        registered: '2012/11/15',
        role: 'Admin',
        status: 'Active'
    },
    {
        id: "0000-0000-0000-0002",
        email: 'test@test.com',
        password: 'test',
        registered: '2012/11/15',
        type: 'Thermostat',
        role: 'User',
        status: 'Active'
    },
    {
        id: "0000-0000-0000-0003",
        email: 'test3@test.com',
        password: 'test',
        registered: '2012/11/15',
        role: 'User',
        status: 'Locked'
    },
];

const express = require('express');
const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
    res.status(200).json(USERS);
});

const { v4: uuidv4 } = require('uuid');

usersRoutes.post('/', (req, res) => {
    const USER = {
        id: uuidv4(),
        ...req.body,
    }
    USERS.push(USER);
    res.status(201).json(USER);
});

usersRoutes.get('/:email', (req, res) => {
    const USER = USERS.find(u => u.email == req.params.email);
    if (USER) {
        res.status(200).json(USER);
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    usersRoutes,
    USERS
};
