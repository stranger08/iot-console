const postgres = require('postgres')

const URI = 'postgres://postgres:postgres@localhost:5432/postgres';

let client = null;

const constructConnection = async () => {
    try {
        const conn = postgres(URI, {});
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