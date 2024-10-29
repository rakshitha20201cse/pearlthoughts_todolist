// src/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_app',
    password: 'rakshi123',
    port: 5432,
});

module.exports = pool;
