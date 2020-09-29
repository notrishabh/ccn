const express = require('express');
const route = express.Router();

route.get('/', (req,res)=>{
    res.render('home', {
        message : req.flash('message')
    });
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
                req.flash('message', 'Wrong Password');
                res.redirect('/');
            }
        }else{

            req.flash('message', 'Wrong Credentials');
            res.redirect('/');
        }
    });

}





module.exports = route;