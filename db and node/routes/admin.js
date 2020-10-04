const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticateds} = require('../config/adminAuth');    //Login Authenticator

route.get('/', ensureAuthenticateds, (req,res)=>{
    console.log(req.user);
    res.render('adminPanel', {
        name : req.user.name
    });
});

route.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You have logged out');
    res.redirect('/adminLogin');
});


route.use('/payments', require('./payments'));

// route.get('/payments/today', (req,res)=>{
//     res.render('payments/today');
// });


module.exports = route;