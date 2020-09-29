const express = require('express');
const route = express.Router();
const mysql = require("mysql");

route.get('/', (req,res)=>{
    res.render('home');
});

route.post('/', (req,res)=>{
    adminLogin(req,res);
});

function adminLogin(req,res){
    var username = req.body.username;
    var password = req.body.password;

    let sql = `SELECT * FROM admin_login WHERE username = "${username}"`;
    db.query(sql, (err, results, fields) => {
        if(results.length > 0){
            var sqlPassword = results[0].password;
            if(sqlPassword == password){
                res.redirect('/admin');
            }else{
                res.render('home', {
                    wrong : "xdd"
                });
            }
        }else{
            console.log("wrong username");
        }
    });

}





module.exports = route;