//store user info in session
const LocalStrategy = require("passport-local").Strategy;
const {Pool} = require("pg");
// const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const connectionString = `postgres://kim:password@localhost:5432/courses`;
const pool = new Pool({
    connectionString
});
function initialize(passport){
    console.log("inside");
   
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email],
            (err, results) => {
                if(err){
                    throw err;
                }
                console.log("inside");
                console.log(results.rows);
                if(results.rows.length > 0){
                    const user = results.rows[0];
                   
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            console.log(err);
                        }
                        if(isMatch){
                            //return user obj to put in app
                            //done(no errors, return user)
                            return done(null, user);
                        }
                        else{
                            return done(null, false, { message: "Password not correct" });
                        }
                    });
                }else{
                    //if no users found in database
                    return done(null, false, { message: "Email not registered" });
                }

            }
        );
    };

    passport.use(
        new LocalStrategy({
            usernameField: "email", passwordField: "password"
            },
            authenticateUser
        )
    );

    //stores userid in session COOKIE
    passport.serializeUser((user, done) => done(null, user.id));
    
    //uses user id in session when nnavigate to different pages
    passport.deserializeUser((id, done) =>{
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results)=> {
            if(err){
                return done(err);
            }
            console.log(`ID is ${results.rows[0].id}`);
            return done(null, results.rows[0]);
        });
    });
}

module.exports = initialize;