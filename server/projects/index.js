const express = require('express');
const ramda = require('ramda');
const projectsRoutes = express.Router();
const projectsService = require('./service');
const { usersService } = require('../users');

projectsRoutes.get('/', async (req, res) => {
    const QUERY = ramda.path(['query', 'list'], req);

    if (QUERY == 'all') {
        const PROJECTS = await projectsService.findAll();
        res.status(200).json(PROJECTS);
    } else if (QUERY == 'assigned') {
        const USER_ID = ramda.path(['user', 'id'], req);
        const PROJECTS_IDS = await projectsService.findUserProjects(USER_ID);
        const PROJECTS = [];
        for (let projectId of PROJECTS_IDS) {
            let project = await projectsService.findById(projectId);
            PROJECTS.push(project);
        }
        res.status(200).json(PROJECTS);
    }
});

projectsRoutes.post('/', async (req, res) => {
    const USER_ID = ramda.path(['user', 'id'], req);
    const PROJECT_PAYLOAD = ramda.path(['body'], req);
    const PROJECT = projectsService.create(USER_ID, PROJECT_PAYLOAD);
    res.status(201).json(PROJECT);
});

projectsRoutes.post('/join/:project_id/:user_email', async (req, res) => {
    const USER_EMAIL = ramda.path(['params', 'user_email'], req);
    const USER = await usersService.findByEmail(USER_EMAIL);
    if (!USER) {
        res.status(400).json({error: "User email is not registered!"});
        return;
    }
    const PROJECT_ID = ramda.path(['params', 'project_id'], req);
    const PROJECT = await projectsService.findById(PROJECT_ID);
    if (!PROJECT) {
        res.status(400).json({error: `Project ${PROJECT_ID} does not exist!`});
        return;
    }
    await projectsService.addUserToProject(USER, PROJECT);
    res.status(201).json(PROJECT);
});

projectsRoutes.get('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const PROJECT = await projectsService.findById(ID);
    if (PROJECT) {
        const USERS_IDS = await projectsService.findProjectUsers(ID);
        PROJECT.users = [];
        for (let userId of USERS_IDS) {
            let user = await usersService.findById(userId);
            PROJECT.users.push(user);
        };
        res.status(200).json(PROJECT);
    } else {
        res.status(404).json({});
    }
});

projectsRoutes.delete('/:id', async (req, res) => {
    const ID = ramda.path(['params', 'id'], req);
    const PROJECT = await projectsService.deleteById(ID);
    if (PROJECT) {
        res.status(200).json({id:ID});
    } else {
        res.status(404).json({});
    }
});

module.exports = {
    projectsRoutes,
    projectsService,
};
