const pool = require('../config/database');
const {genSaltSync,hashSync} = require("bcrypt");
const validator = require('email-validator');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    try {
        resp = {};   
    const {email,password} = req.body;

    const query = await pool.promise().query( 
        ` SELECT  Password,admin FROM  tbluser WHERE  email =  '${email}'`
     );
     if(query[0].length>0){
        if(query[0][0]['admin']==1){
            const result = await bcrypt.compare(password, query[0][0]['Password']);
            if(result){
                const query = await pool.promise().query( 
                    ` SELECT  FirstName,LastName,Email  FROM  tbluser WHERE Email =  '${email}'`
                 );
                 const jsontoken= jwt.sign({},"qwe1234",{
                    expiresIn:"1h"
                 })
                 query[0][0]['token'] = jsontoken
                resp.success = true;
                resp.message = "OK"; 
                resp.data = query[0]; 
            }
        }
        else{
            resp.success = false;
            resp.message = "You are not allowed to login from here"; 
            resp.data = []; 
        }
     }
     else{
        resp.success = false;
        resp.message = "user not exist"; 
        resp.data = []; 
     }    
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}
exports.registration = async (req, res) => {
    try {
        resp = {};
    const {firstname,lastname,email,password,confirm_password,admin} = req.body;
    const query3 = await pool.promise().query( 
        ` SELECT  FirstName FROM  tbluser WHERE Email = '${email}'`
     );
    if(validator.validate(email))
    {
        if(query3[0].length==0){
        if(password==confirm_password){  
            const salt = genSaltSync(10);
            const pass =hashSync(password,salt) 

            const query = await  pool.promise().query(
                `INSERT INTO tbluser( FirstName,LastName, Email, Password, admin )
                VALUES('${firstname}','${lastname}','${email}','${pass}','${admin}')` 
            );
            resp.success = true;
            resp.message = "user register successfully"; 
            resp.data = [];
        }
        else{
            resp.success = false;
            resp.message = "password and confirm password not match"; 
            resp.data = []; 
        }
    }else{
        resp.success = false;
         resp.message = "email exist"; 
         resp.data = []; 
    
    }
}
    else{
        resp.success = false;
        resp.message = "not valid email"; 
        resp.data = [];
    }

    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}

