const express = require('express');
const route = express.Router();
const mysql = require("mysql");
const {ensureAuthenticateds} = require('../config/adminAuth');    //Login Authenticator



route.get('/', ensureAuthenticateds, (req,res)=>{
    console.log(req.user);
    var monthlyEarnings = 'NA';
    var yearlyEarnings = 'NA';
    var latestName = 'NA';
    var latestAmount = 'NA';
    var totalComplaints = 'NA';


    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1);
    var yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;

    let sql = `SELECT SUM(Amount) AS total FROM payment WHERE MONTH(Date) = "${mm}"`;
    db.query(sql,(err,results)=>{
        monthlyEarnings = results[0].total;
        let sql = `SELECT SUM(Amount) AS total FROM payment WHERE YEAR(Date) = "${yyyy}"`;
        db.query(sql, (err,results)=>{
            yearlyEarnings = results[0].total;
            let sql = `SELECT * FROM payment ORDER BY id DESC LIMIT 1`;
            db.query(sql, (err,results)=>{
                latestName = results[0].Name;
                latestAmount = results[0].Amount;
                let sql = `SELECT COUNT(id) AS total FROM complaint WHERE Checkbox = 0`;
                db.query(sql, (err, results)=>{
                    totalComplaints = results[0].total;
                    let sql = `SELECT SUM(Amount) AS sum,month(Date) AS month FROM payment GROUP BY month(Date)`;
                    db.query(sql, (err,results)=>{
                        var sum = results;
                        res.render('adminPanel', {
                            user : req.user,
                            monthlyEarnings : monthlyEarnings,
                            yearlyEarnings : yearlyEarnings,
                            latestName : latestName,
                            latestAmount : latestAmount,
                            totalComplaints : totalComplaints,
                            sum : sum
                        });
                    });

                    

                });

                
            });
            
        });
        
    });
    
});

route.get('/no',(req,res)=>{
    let sql = `SELECT SUM(Amount),month(Date) FROM payment GROUP BY month(Date)`;
    db.query(sql, (err,results)=>{
        console.log(results);
    });
});

route.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You have logged out');
    res.redirect('/adminLogin');
});


route.use('/payments', require('./payments'));
route.use('/complaints', require('./complaints'));
route.use('/offlinePayments', require('./offlinePayments'));


module.exports = route;