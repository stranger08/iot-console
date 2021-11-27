const DEVICES = [
    {
        id: "2421-1242-0923-2942",
        name: 'Living Room temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Inactive'
    },
    {
        id: "2421-1242-0923-2042",
        name: 'Kitchen temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Active'
    },
    {
        id: "2421-1200-0923-2942",
        name: 'Bedroom temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Unreachable'
    },
    {
        id: "2331-1242-0923-2942",
        name: 'Guestroom temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Active'
    },
    {
        id: "2421-1242-0923-9393",
        name: 'Bathroom temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Interruptions'
    }
];

const express = require('express');
const devices = express.Router();

devices.get('/', (req, res) => {
    res.status(200).json(DEVICES);
});

devices.post('/', (req, res) => {
    DEVICES.push(req.body);
    res.status(201).json(req.body);
});

devices.get('/:id', (req, res) => {
    const DEVICE = DEVICES.find(d => d.id == req.params.id);
    if (DEVICE) {
        res.status(200).json(DEVICE);
    } else {
        res.status(404).json({});
    }
});

module.exports = devices;
