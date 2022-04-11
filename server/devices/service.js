const { getSqlClient } = require('../dbclient/sql-provider');
const validator = require('validator');
const ramda = require('ramda');

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from devices
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const DEVICE = ramda.path(['0'], RESULT);
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
    return await SQL`
        select *
        from devices
        where project_id = ${projectId}`;
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
            name = ${ device.name },
            data = ${ SQL.json(device.data)},
            telemetry = ${ SQL.json(device.telemetry) },
            settings = ${ SQL.json(device.settings) }
            where id = ${ ID }
        returning *`;

    return RESULT.length == 1 ? RESULT[0] : undefined;
}

const deleteById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        delete from devices
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        return id;
    } else if (COUNT == 0) {
        console.log(`GroupsService group with id ${id} not found.`);
        return undefined;
    }
}

module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    findAllByProject,
    update,
}