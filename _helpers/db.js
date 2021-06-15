const { createPool } = require('mysql2');

try{
  var pool = createPool({
    host: 'robinbook.cvzz91ztbary.eu-west-3.rds.amazonaws.com',
    port:3306,
    user: 'admin',
    password: 'RobinBookDB',
    database: 'robinbook',
    connectionLimit: 10
  });
  module.exports = pool;
  console.log("Connected");
}
catch(err){
  console.log(err);
}