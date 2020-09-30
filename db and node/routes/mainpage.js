const express = require('express');
const passport = require('passport');
const route = express.Router();

var errors = []; //Flash errors



route.get('/', (req,res)=>{
    res.render('home', {
        errors
    });
});

// route.post('/', (req,res)=>{
//     adminLogin(req,res);
// });

// function adminLogin(req,res){
//     var uname = req.body.username;
//     var pwd = req.body.password;


//     let sql = `SELECT * FROM admin_login WHERE username = "${uname}"`;
//     db.query(sql, (err, results, fields) => {
//         if(results.length > 0){

//             initializePassport(passport, results[0].username);
//             var sqlPassword = results[0].password;
//             if(sqlPassword == pwd){
//                 res.redirect('/admin');
//             }else{
//                 req.flash('message', 'Wrong Password');
//                 res.redirect('/');
//             }
//         }else{

//             req.flash('message', 'Wrong Credentials');
//             res.redirect('/');
//         }
//     });

// }


//===========PASSPORT LOGIN SYSTEM=========

route.post('/', (req,res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/',
        failureFlash: true
    })(req,res,next);
});

//==========================================



module.exports = route;