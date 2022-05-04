const { getSqlClient } = require('../dbclient/sql-provider');
const { getMongoClient } = require('../dbclient/mongo-provider');

const validator = require('validator');
const ramda = require('ramda');

const _getTelemetry = async (id) => {
    const SQL = await getSqlClient();
    const TELEMETRY = await SQL`
        select *
        from device_telemetry
        where device_id = ${id}`;

    return TELEMETRY.map(t => {
        return {
            device: t.device_id,
            name: t.name,
            path: t.data_ref,
        };
    });
}

const _getSettings = async (id) => {
    const SQL = await getSqlClient();
    const SETTINGS = await SQL`
        select *
            from device_setting
            where device_id = ${id}`;

    return SETTINGS.map(s => {
        return {
            device: s.device_id,
            name: s.name,
            type: s.type,
            path: s.path,
            value: s.value,
        };
    });
}

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from devices
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const DEVICE = ramda.path(['0'], RESULT);
        
        DEVICE.telemetry = await _getTelemetry(id);
        DEVICE.settings = await _getSettings(id);
        return DEVICE;
    } else if (COUNT == 0) {
        console.log(`DevicesService device with id ${id} not found.`);
        return undefined;
    }
}

const findAll = async () => {
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from devices`;
}

const findAllByProject = async (projectId) => {
    if (!validator.isNumeric(projectId)) {
        return [];
    }
    const SQL = await getSqlClient();
    const DEVICE_LIST = await SQL`
        select *
        from devices
        where project_id = ${projectId}`;

    let result = [];
    for (let device of DEVICE_LIST) {
        let telemetry = await _getTelemetry(device.id);
        let settings = await _getSettings(device.id);
        result.push({
            ...device,
            telemetry,
            settings,
        });
    }
    return result;
}

const create = async (userId, projectId, device) => {
    const NAME = ramda.path(['name'], device);
    const TYPE = ramda.path(['type'], device);
    const GROUP = ramda.path(['group'], device);
    const STATUS = ramda.pathOr('Active', ['status'], device);

    const SQL = await getSqlClient();
    const [new_device] = await SQL`
        insert into devices (
            user_id, group_id, project_id, name, "registeredAt", type, status
        ) values (
            ${userId}, ${GROUP}, ${projectId}, ${NAME}, now(), ${TYPE}, ${STATUS}
        )
        returning *`
    
    return new_device;
}

const update = async (device) => {
    const ID = ramda.path(['id'], device);

    if (!ID) {
        throw new Error(`DeviceServices m(update) - ID not specified.`)
    }

    const SQL = await getSqlClient();
    const RESULT = await SQL`
        update devices set
            name = ${ device.name }
            where id = ${ ID }
        returning *`;

    await SQL`
        delete from device_telemetry
        where device_id = ${ ID }`;
    
    const TELEMETRY = device.telemetry.map(t => {
        return {
            device_id: ID,
            name: t.name,
            data_ref: t.path,
        };
    });
    
    if (TELEMETRY.length > 0) {
        await SQL`insert into device_telemetry ${ SQL(TELEMETRY, 'device_id', 'name', 'data_ref') }`;
    }

    await SQL`
        delete from device_setting
        where device_id = ${ ID }`;

    const SETTINGS = device.settings.map(s => {
        return {
            device_id: ID,
            name: s.name,
            type: s.type,
            path: s.path,
            value: s.value,
        }
    });
    
    if (SETTINGS.length > 0) {
        await SQL`insert into device_setting ${ SQL(SETTINGS, 'device_id', 'name', 'type', 'path', 'value') }`;
    }

    return RESULT.length == 1 ? RESULT[0] : undefined;
}

const deleteById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        delete from devices
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        await SQL`
            delete from device_telemetry
            where device_id = ${ id }`;
        await SQL`
            delete from device_setting
            where device_id = ${ id }`;
        return id;
    } else if (COUNT == 0) {
        console.log(`Device with id ${id} not found.`);
        return undefined;
    }
}

const findDataById = async (id) => {
    const CLIENT = await getMongoClient();
    const DB = CLIENT.db();
    const COLLECTION = DB.collection('data');
    const DEVICE_DATA = await COLLECTION.find(
        {
           'device.id': Number(id),
        },
        {
            projection: {
                'data': 1,
                'timestamp': 1
            }
        }).toArray();
    return DEVICE_DATA;
}

const findLatestDataPacket = async (id) => {
    const CLIENT = await getMongoClient();
    const DB = CLIENT.db();
    const COLLECTION = DB.collection('data');
    const LATEST_DATA_PACKET = await COLLECTION.find(
        {
           'device.id': Number(id),
        },
        {
            projection: {
                'data': 1,
                'timestamp': 1
            },
            sort: {
                'timestamp': -1
            },
            limit: 1
        }).toArray();

    return LATEST_DATA_PACKET[0];
}

module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    findAllByProject,
    update,
    findDataById,
    findLatestDataPacket,
}