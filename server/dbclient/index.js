const postgres = require('postgres')

const sql = postgres('postgres://postgres:postgres@localhost:5432/postgres', {})

module.exports = sql