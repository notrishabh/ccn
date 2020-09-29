const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'username'}, (username, password, done) => {
            //Match username
            let sql = `SELECT * FROM admin_login WHERE username = "${username}" LIMIT 1`;
            db.query(sql, (err, result)=>{
                if(result.length == 0){
                    return done(null, false, {message : "Not registered username"});
                }else{
                    if(password == result[0].password){
                        return done(null, result[0]);
                    }else{
                        return done(null, false, {message : "Wrong password"});
                    }
                }
            });
        })
    );

    passport.serializeUser((user,done)=> {
        done(null, user.id);
    });
    passport.deserializeUser((id,done)=> {
        db.query(`SELECT * FROM admin_login WHERE id = ${id}`, (err, result)=>{
            done(null, result[0]);
        });
    });
}