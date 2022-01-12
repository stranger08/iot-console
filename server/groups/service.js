const sql = require('../dbclient');
const ramda = require('ramda');

const findById = async (id) => {
    const RESULT = await sql`
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
    const RESULT = await sql`
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
    return await sql`
        select *
        from groups`;
}

const findAllByProject = async (projectId) => {
    return await sql`
        select *
        from groups
        where project_id = ${projectId}`;
}

const create = async (userId, projectId, group) => {
    const NAME = ramda.path(['name'], group);

    const [new_group] = await sql`
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