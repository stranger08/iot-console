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
        status: 'Active',
        data: [
            {
                "received": "2021-12-14T18:27:36.115Z",
                "temp": 15
            },
            {
                "received": "2021-12-14T18:27:38.814Z",
                "temp": 12
            },
            {
                "received": "2021-12-14T18:27:42.608Z",
                "temp": 1
            },
            {
                "received": "2021-12-14T18:27:47.748Z",
                "temp": 10
            },
            {
                "received": "2021-12-14T18:27:50.388Z",
                "temp": 12
            },
            {
                "received": "2021-12-14T18:27:52.737Z",
                "temp": 13
            }
        ]
    },
    {
        id: "2421-1242-0923-9393",
        name: 'Bathroom temperature',
        registered: '2012/11/15',
        type: 'Thermostat',
        status: 'Interruptions'
    }
];

const { v4: uuidv4 } = require('uuid');
const ramda = require('ramda');
const express = require('express');
const devicesRoutes = express.Router();

const findDeviceById = id => DEVICES.find(d => d.id == id);

devicesRoutes.get('/:id', (req, res) => {
    const DEVICE = findDeviceById(req.params.id);
    if (DEVICE) {
        res.status(200).json(DEVICE);
    } else {
        res.status(404).json({});
    }
});

devicesRoutes.get('/', (req, res) => {
    res.status(200).json(DEVICES);
});

devicesRoutes.post('/', (req, res) => {
    const ID = ramda.path(['body', 'id'], req);

    if (ID) {
        let i = DEVICES.findIndex(d => d.id == ID);
        if (i > -1) {
            const DEVICE = DEVICES[i];
            DEVICES[i] = ramda.mergeLeft(req.body, DEVICE);
            res.status(201).json(DEVICES[i]);
        } else {
            res.status(404).json(`No device found with specified id: ${ID}`);
        }
    } else {
        const DEVICE = {
            id: uuidv4(),
            ...req.body,
        }
        DEVICES.push(DEVICE);
        res.status(201).json(DEVICE);
    }
});

module.exports = {
    findDeviceById,
    devicesRoutes
};
