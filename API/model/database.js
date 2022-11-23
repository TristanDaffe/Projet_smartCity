const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'smartcity',
    password: 'password',
    port: 5432,
});

module.exports = pool;