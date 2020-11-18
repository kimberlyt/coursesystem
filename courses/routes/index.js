var express = require('express');
var router = express.Router();
const http = require("../http-common");
const passport = require("passport");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://username:password@localhost:5432/database')
var initModels = require('../models/init-models');
const initializePassport = require("../passportConfig");
const { response } = require('../app');
const Op = Sequelize.Op;
const {Pool} = require("pg");
const bcrypt = require("bcrypt");


var tutorials;

initializePassport(passport);

var models = initModels(sequelize);
// Funtion inside passport which initializes passpor
router.use(passport.initialize());
router.use(passport.session());



router.get('/', function(req, res, next) {
  req.session.foo = "kpdo"
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/login', (req, res)=>{
  res.render('login');
});
router.get('/register', (req, res)=>{
  res.render('register');
});


router.post('/register', async (req, res)=>{
  let {name, email, password} = req.body;
  console.log({
      name, email, password
  });
//if errors pushed to this array
  let errors = [];

  if (!name || !email ||!password){
      errors.push({message:"Please enter all fields"});
  }

  if(password.length < 6){
      errors.push({ message: "Password should be at least 6 characters long"});
  }

  if(errors.length>0){
      res.render("register", {errors});
  }else{
      //Form validation pass
      let hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      var user = await models.users.findOne( { where: {user_email: email}});
      if(user == null){
      await models.users.create({user_name: name, user_email: email,user_password: hashedPassword});
        // req.flash("success_msg", "YOU ARE NOW registered please login");
         res.redirect('/login');
      }else{
        res.redirect('/register');
      }
   
  }
});

router.post('/login', async(req, res)=>{
  console.log(req.body.email);
  var user = await models.users.findOne( { where: {user_email: req.body.email}});
  console.log(user);

  if(user != null){
 
   
    bcrypt.compare(req.body.password, user.user_password, (err, isMatch) => {
        if(err){
            console.log(err);
        }
        if(isMatch){
            console.log("is a match");
            req.session.user = user;
            res.redirect('/courses');
  

        }
        else{
            console.log( "Password not correct" );
        }
    });
}else{
    //if no users found in database
    return console.log( "Email not registered" );
}
});




////////SEARCH Course
router.get('/course/search',async function(req, res, next){
    const coursequery = req.body.course;
  let { term } = req.query; 
  var courses = await models.courses.findAll( { where: { course_name: { [Op.like]: '%' + term + '%'} }});
  res.render('courses', {page:'Home', menuId:'home', courses: courses});

});


router.get('/usr/:userid/details/:courseid',async function(req, res, next){
  var user = await models.users.findOne({ where: { userid: req.params["userid"] }});

  var course = await models.courses.findOne({ where: { coursesid: req.params["courseid"] }});
  var departmentname = await models.department.findOne({ where: { departmentid: course.departmentid }});

  console.log("department " + departmentname.department_name);
  var comments = await models.comments.findAll({ where: { coursesid: req.params["courseid"] }});
  res.render('details', {page:'Home', menuId:'home', departmentname: departmentname.department_name, course: course, comments: comments, userid: req.params["userid"]});


});



router.get('/comment/:courseid', async function(req, res, next) {
  let { comment, rating } = req.query; 
  console.log("users is " + rating + comment)
  var users = await models.comments.create({comment_text: comment, rating: rating, coursesid: req.params["courseid"]});
  console.log(users)
   res.redirect('/details/'+ users.dataValues.coursesid);
});

//FINISHED YET?
router.get('/:userid/course/:courseid', async function (req, res, next) {
  console.log("finished user " + req.params["userid"]);
    let { length, completed } = req.query; 
    var relation= await models.user_course.create({userid: req.params["userid"], the_length: length, is_completed: completed, coursesid: req.params["courseid"]});
    console.log(relation)
    res.redirect('/courses');
  });



router.get('/users', async function(req, res, next) {
  console.log("users is ")
  var users = await models.users.findAll();
  res.render('users', {page:'Home', menuId:'home', users: users});
});


router.get('/courses', async function (req, res, next){
       console.log("UsER ID:" + req.session.user.userid);
 
  await models.courses.findAll().then(courses => res.render('courses', {currentuser: req.session.user.userid, page:'Home', menuId:'home',
    courses
  })).catch(err => console.log(err))

  
}

);

router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect("/login");
});


function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return res.redirect("/courses");
  }
  next();
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


module.exports = router;
