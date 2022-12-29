const mysql = require('mysql2')

const pool = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'user',
    password:'123',
    database:'MySql',
})
pool.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected");
    }
})
module.exports = pool;