const sql = require('../dbclient');
const ramda = require('ramda');

const findById = async (id) => {
    const RESULT = await sql`
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
    const RESULT = await sql`
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
    return await sql`
        select *
        from projects`;
}

const findAllByUserId = async (userId) => {
    return await sql`
        select *
        from projects
        where created_by = ${ userId }`;
}

const create = async (userId, project) => {
    const NAME = ramda.path(['name'], project);

    const [new_project] = await sql`
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

    const [new_project_collaborator] = await sql`
        insert into project_users (
            project_id, user_id
        ) values (
            ${PROJECT_ID}, ${USER_ID}
        )
        returning *`
    
    return new_project_collaborator;
}

const findProjectUsers = async (projectId) => {
    const RESULT = await sql`
                    select user_id
                    from project_users
                    where project_id = ${ projectId }`;

    return RESULT.map(u => u.user_id);
}

const findUserProjects = async (userId) => {
    const RESULT = await sql`
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