const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticateds} = require('../config/adminAuth');    //Login Authenticator


route.get('/today', ensureAuthenticateds, (req,res)=>{
    res.render('payments/today',{

    });
});





module.exports = route;