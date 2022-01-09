const sql = require('../dbclient');
const ramda = require('ramda');

const findById = async (id) => {
    const RESULT = await sql`
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
    return await sql`
        select *
        from devices`;
}

const findAllByUserId = async (userId) => {
    return await sql`
        select *
        from devices
        where user_id = ${ userId }`;
}

const create = async (userId, device) => {
    const NAME = ramda.path(['name'], device);
    const TYPE = ramda.path(['type'], device);
    const GROUP = ramda.path(['group'], device);
    const STATUS = ramda.pathOr('Active', ['status'], device);

    const [new_device] = await sql`
        insert into devices (
            user_id, group_id, name, "registeredAt", type, status
        ) values (
            ${userId}, ${GROUP}, ${NAME}, now(), ${TYPE}, ${STATUS}
        )
        returning *`
    
    return new_device;
}

const update = async (device) => {
    const ID = ramda.path(['id'], device);

    if (!ID) {
        throw new Error(`DeviceServices m(update) - ID not specified.`)
    }

    const RESULT = await sql`
        update devices set
            name = ${ device.name },
            data = ${ sql.json(device.data)},
            telemetry = ${ sql.json(device.telemetry) },
            settings = ${ sql.json(device.settings) }
            where id = ${ ID }
        returning *`;

    return RESULT.length == 1 ? RESULT[0] : undefined;
}

const deleteById = async (id) => {
    const RESULT = await sql`
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
    findAllByUserId,
    update,
}