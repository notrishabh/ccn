const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticated} = require('../config/auth');    //Login Authenticator

route.get('/', ensureAuthenticated, (req,res)=>{
    console.log(req.user);
    res.render('customerPanel', {
        data : req.user
    });
});

route.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You have logged out.');
    res.redirect('/');
});



module.exports = route;