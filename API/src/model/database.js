require("dotenv").config();
const process = require("process");
const initDB = require("../scripts/JS/initDB");

const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

if(process.env.CREATION_DB) {
    initDB(pool).then(() => console.log("done"));
}
module.exports = pool;