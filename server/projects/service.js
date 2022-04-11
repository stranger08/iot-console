const { getSqlClient } = require('../dbclient/sql-provider');
const ramda = require('ramda');

const findById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        select *
        from projects
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        const project = ramda.path(['0'], RESULT);
        return project;
    } else if (COUNT == 0) {
        console.log(`ProjectsService project with id ${id} not found.`);
        return undefined;
    }
}

const deleteById = async (id) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
        delete from projects
        where id = ${ id }`;

    const COUNT = ramda.path(['count'], RESULT);

    if (COUNT == 1) {
        return id;
    } else if (COUNT == 0) {
        console.log(`projectsService project with id ${id} not found.`);
        return undefined;
    }
}

const findAll = async () => {
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from projects`;
}

const findAllByUserId = async (userId) => {
    const SQL = await getSqlClient();
    return await SQL`
        select *
        from projects
        where created_by = ${ userId }`;
}

const create = async (userId, project) => {
    const NAME = ramda.path(['name'], project);

    const SQL = await getSqlClient();
    const [new_project] = await SQL`
        insert into projects (
            name, created_by, created_at
        ) values (
            ${NAME}, ${ userId }, now()
        )
        returning *`
    
    return new_project;
}

const addUserToProject = async (user, project) => {
    const USER_ID = ramda.path(['id'], user);
    const PROJECT_ID = ramda.path(['id'], project);

    const SQL = await getSqlClient();
    const [new_project_collaborator] = await SQL`
        insert into project_users (
            project_id, user_id
        ) values (
            ${PROJECT_ID}, ${USER_ID}
        )
        returning *`
    
    return new_project_collaborator;
}

const findProjectUsers = async (projectId) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
                    select user_id
                    from project_users
                    where project_id = ${ projectId }`;

    return RESULT.map(u => u.user_id);
}

const findUserProjects = async (userId) => {
    const SQL = await getSqlClient();
    const RESULT = await SQL`
                    select project_id
                    from project_users
                    where user_id = ${ userId }`;

    return RESULT.map(p => p.project_id);
}

module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    findAllByUserId,
    findProjectUsers,
    findUserProjects,
    addUserToProject,
}