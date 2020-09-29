const express = require('express');
const route = express.Router();
const mysql = require("mysql");

route.get('/', (req,res)=>{
    res.send("admin");
});



module.exports = route;