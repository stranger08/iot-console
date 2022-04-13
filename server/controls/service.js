const { getSqlClient } = require('../dbclient/sql-provider');
const ramda = require('ramda');

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from controls
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const CONTROL = ramda.path(['0'], RESULT);
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

module.exports = {
    create,
    findAll,
    findById,
    findAllByProjectId,
    deleteById,
}