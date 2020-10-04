const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticateds} = require('../config/adminAuth');    //Login Authenticator


route.get('/today', ensureAuthenticateds, (req,res)=>{
    let sql = 'SELECT * FROM payment'
    db.query();

    res.render('payments/today',{
        user : req.user
    });
});





module.exports = route;