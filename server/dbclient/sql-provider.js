const postgres = require('postgres')

const URI = 'postgres://localhost:5432/postgres';

let client = null;

const constructConnection = async () => {
    try {
        const conn = await postgres({
            host: 'localhost',
            port: 5432,
            database: 'postgres',
            username: 'postgres',
            password: 'postgres',
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