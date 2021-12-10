const {Pool} = require('pg');
require('dotenv').config();
;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const db = process.env.DB
const connectionString =`postgresql://postgres:${password}@${host}:${port}/${db}`

const pool = new Pool ({

  connectionString
})

pool.connect().then(res => console.log("connected"))
.catch(err => console.log(err, password, host, port, db))

module.exports = pool;