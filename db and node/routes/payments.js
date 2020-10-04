const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticateds} = require('../config/adminAuth');    //Login Authenticator


route.get('/today', ensureAuthenticateds, (req,res)=>{
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1);
    var yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;

    let sql = `SELECT * FROM payment WHERE Date = "${today}" ORDER BY Time DESC`;
    db.query(sql, (err,results)=>{

        res.render('payments/today',{
            user : req.user,
            results : results,
            today : today
        });
    });

    
});





module.exports = route;