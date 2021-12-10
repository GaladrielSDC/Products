const {Pool} = require('pg');
;
const connectionString =

const pool = new Pool ({

  connectionString
})

pool.connect().then(res => console.log("connected"))
.catch(err => console.log(err))

module.exports = pool;