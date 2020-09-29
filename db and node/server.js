const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const port = 8000;
const mysql = require('mysql');

app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json());

app.set('view engine', 'ejs');

db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'ccn'
});

db.connect((err)=>{
    if(!err){
        console.log("Database Connected");
    }
});







const adminController = require('./routes/admin');
app.use('/admin', adminController);
app.use('/', require('./routes/mainpage'));





app.listen(port, ()=>{
    console.log("Server Connected");
});