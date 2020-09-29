const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 8000;
const mysql = require('mysql');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


require('./config/passport-config')(passport);

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

app.use(session({
    secret : 'secret',
    cookie : { maxAge : 60000},
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});




app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/mainpage'));





app.listen(port, ()=>{
    console.log("Server Connected");
});