const { getSqlClient } = require('../dbclient/sql-provider');
const validator = require('validator');
const ramda = require('ramda');

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from groups
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const GROUP = ramda.path(['0'], RESULT);
        return GROUP;
    } else if (COUNT == 0) {
        console.log(`GroupsService group with id ${id} not found.`);
        return undefined;
    }
}

const deleteById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        delete from groups
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        return id;
    } else if (COUNT == 0) {
        console.log(`GroupsService group with id ${id} not found.`);
        return undefined;
    }
}

const findAll = async () => {
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from groups`;
}

const findAllByProject = async (projectId) => {
    if (!validator.isNumeric(projectId)) {
        return [];
    }
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from groups
        where project_id = ${projectId}`;
}

const create = async (userId, projectId, group) => {
    const NAME = ramda.path(['name'], group);

    const SQL = await getSqlClient();
    const [new_group] = await SQL`
        insert into groups (
            user_id, project_id, name, "registeredAt"
        ) values (
            ${ userId }, ${projectId}, ${NAME}, now()
        )
        returning *`
    
    return new_group;
}

module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    findAllByProject,
}