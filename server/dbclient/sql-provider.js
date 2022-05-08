const postgres = require('postgres');
const config = require('../config');

let client = null;

const constructConnection = async () => {
    const configuration = await config();
    try {
        const conn = await postgres({
            host: configuration.PG_HOST,
            port: configuration.PG_PORT,
            database: configuration.PG_DB,
            username: configuration.PG_USER,
            password: configuration.PG_PASS,
        });
        return conn;
    } catch (err) {
        console.dir(err);
    }
}

const getSqlClient = async () => {
    if (client) {
        return client;
    } else {
        client = await constructConnection();
        return client;
    }
}

module.exports = {
    getSqlClient
}