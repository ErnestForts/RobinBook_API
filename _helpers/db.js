const { createPool } = require('mysql2');

try{
  var pool = createPool({
    host: ENV['host'],
    port: ENV['port'],
    user: ENV['user'],
    password: ENV['password'],
    database: ENV['database'],
    connectionLimit: 10
  });
  module.exports = pool;
  console.log("Connected");
}
catch(err){
  console.log(err);
}