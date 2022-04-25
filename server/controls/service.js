const { getSqlClient } = require('../dbclient/sql-provider');
const ramda = require('ramda');
const validator = require('validator');

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from controls
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const CONTROL = ramda.path(['0'], RESULT);
        const CONDITIONS = await SQL`
            select *
            from controls_conditions
            where control_id = ${id}`;

        CONTROL.conditions = CONDITIONS.map(c => {
            return {
                control: c.control_id,
                device: c.device_id,
                path: c.data_path,
                operator: c.operator,
                value: c.value,
            };
        });

        const ACTIONS = await SQL`
            select *
            from controls_actions
            where control_id = ${id}`;

        CONTROL.actions = ACTIONS.map(a => {
            return {
                control: a.control_id,
                device: a.device_id,
                setting: a.setting_path,
                value: a.value,
            };
        });
        return CONTROL;
    } else if (COUNT == 0) {
        console.log(`ControlsService control configuration with id ${id} not found.`);
        return undefined;
    }
}

const deleteById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        delete from controls
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        await SQL`
            delete from controls_conditions
            where control_id = ${ ID }`;
        await SQL`
            delete from controls_actions
            where control_id = ${ ID }`;
        return id;
    } else if (COUNT == 0) {
        console.log(`controlsService control with id ${id} not found.`);
        return undefined;
    }
}

const findAll = async () => {
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from controls`;
}

const findAllByProjectId = async (projectId) => {
    if (!validator.isNumeric(projectId)) {
        return [];
    }
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from controls
        where project_id = ${projectId}`;
}

const create = async (userId, projectId, control) => {
    const NAME = ramda.path(['name'], control);

    const SQL = await getSqlClient();
    const [new_control] = await SQL`
        insert into controls (
            user_id, project_id, name, "registeredAt"
        ) values (
            ${userId}, ${projectId}, ${NAME}, now()
        )
        returning *`
    
    return new_control;
}

const update = async (control) => {
    const ID = ramda.path(['id'], control);

    if (!ID) {
        throw new Error(`ControlsService m(update) - ID not specified.`)
    }

    const SQL = await getSqlClient();
    const RESULT = await SQL`
        update controls set
            name = ${ control.name }
            where id = ${ ID }
        returning *`;

    await SQL`
        delete from controls_conditions
        where control_id = ${ ID }`;

    const CONDITIONS = control.conditions.map(c => {
        return {
            control_id: ID,
            device_id: c.device,
            data_path: c.path,
            operator: c.operator,
            value: c.value,
        }
    });
    
    if (CONDITIONS.length > 0) {
        await SQL`insert into controls_conditions ${ SQL(CONDITIONS, 'control_id', 'device_id', 'data_path', 'operator', 'value') }`;
    }

    await SQL`
        delete from controls_actions
        where control_id = ${ ID }`;
    
    const ACTIONS = control.actions.map(a => {
        return {
            control_id: ID,
            device_id: a.device,
            setting_path: a.setting,
            value: a.value,
        };
    });

    if (ACTIONS.length > 0) {
        await SQL`insert into controls_actions ${ SQL(ACTIONS, 'control_id', 'device_id', 'setting_path', 'value') }`;
    }

    return RESULT.length == 1 ? RESULT[0] : undefined;
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findAllByProjectId,
    deleteById,
}