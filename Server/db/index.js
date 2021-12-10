const {Pool} = require('pg');
// const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
const connectionString = 'postgresql://postgres:newpassword@18.188.233.226:5432/products_db'

const pool = new Pool ({
  // user: 'postgres',
  // host: '18.191.163.83',
  // database: 'productOverview',
  // password: 'iloveme',
  // port: '5432',
  connectionString
})

pool.connect().then(res => console.log("connected"))
.catch(err => console.log(err))

module.exports = pool;