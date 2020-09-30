const express = require('express');
const passport = require('passport');
const route = express.Router();


route.get('/', (req,res)=>{
    res.render('customerLogin');
});

route.post('/', (req,res, next)=>{
    passport.authenticate('customer-local', {
        successRedirect: '/customerPanel',
        failureRedirect: '/',
        failureFlash: true
    })(req,res,next);
});




module.exports = route;