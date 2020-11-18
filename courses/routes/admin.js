var express = require('express');
var router = express.Router();
const http = require("../http-common");
const passport = require("passport");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://username:password@localhost:5432/database')
var initModels = require('../models/init-models');
var models = initModels(sequelize);
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('admin/login');
});

router.get('/register', (req, res)=>{
  res.render('registerAdmin');
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
      var user = await models.adminusers.findOne( { where: {user_email: email}});
      if(user == null){
      await models.adminusers.create({username: name, user_email: email,user_password: hashedPassword});
         res.redirect('/admin/login');
      }else{
        res.redirect('/admin/register');
      }
   
  }
});

router.get('/login', (req, res)=>{ 
    res.render('admin_login');
  });

  router.post('/login', async(req, res)=>{
    console.log(req.body.email);
    var user = await models.adminusers.findOne( { where: {user_email: req.body.email}});
    console.log(user);
  
    if(user != null){
   
     
      bcrypt.compare(req.body.password, user.user_password, (err, isMatch) => {
          if(err){
              console.log(err);
          }
          if(isMatch){
              console.log("is a match");
              req.session.user = user;
              res.redirect('/admin/departments');
    
  
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
router.get('/courses', async function (req, res, next){
    console.log(req.session.user);

    await models.courses.findAll().then(courses => res.render('admin_courses', {page:'Home', menuId:'home',
    courses
    })).catch(err => console.log(err))

});

router.get('/departments', async function (req, res, next){
    // console.log(req.session.user);

    await models.department.findAll().then(departments => res.render('admin_departments', {page:'Home', menuId:'home',
    departments
    })).catch(err => console.log(err));

});
router.get('/logout', (req, res)=>{
  req.logOut();
  // req.flash("success_msg", "You have logged out");
  res.redirect("/admin/login");
});

router.get('/department/:id',async function(req, res, next){

  var department = await models.department.findOne({ where: { departmentid: req.params["id"] }});
  var courses = await models.courses.findAll({ where: { departmentid: req.params["id"] }});
  res.render('department_info', {page:'Home', menuId:'home', department: department, courses: courses });
  
  });



    
//EDIT Course
router.get('/edit/department/course/:courseid', async function (req, res, next) {
  var course = await models.courses.findOne({ where: { coursesid: req.params["courseid"] }});
  res.render('edit_course', {page:'Home', menuId:'home', course: course });
 
  });

  router.post('/edit/department/course/:courseid', async function (req, res, next) {
    console.log("Im here");
    await models.courses.update({course_name: req.body.name},
      {returning: true, where: {coursesid: req.params.courseid}});
     
      res.redirect('/admin/courses');
   
    });


  
//EDIT Department
router.get('/edit/department/:departmentid', async function (req, res, next) {
  var department = await models.department.findOne({ where: { departmentid: req.params["departmentid"] }});
  res.render('edit_department', {page:'Home', menuId:'home', department: department });
 
  });

  router.post('/edit/department/:departmentid', async function (req, res, next) {
    console.log("Im here");
    await models.department.update({department_name: req.body.name},
      {returning: true, where: {departmentid: req.params.departmentid}});
     
      res.redirect('/admin/departments');
   
    });

    router.get('/delete/department/:departmentid', async function (req, res, next) {
      console.log("Im here to delete");
      await models.department.destroy({
        where: { departmentid: req.params.departmentid }
      });
       
        res.redirect('/admin/departments')
    });

    router.get('/delete/department/course/:courseid', async function (req, res, next) {
      console.log("Im here to delete");
      await models.courses.destroy({
        where: { coursesid: req.params.courseid }
      });
       
        res.redirect('/admin/courses')
    });



////////SEARCH Department
router.get('/department/search',async function(req, res, next){
  const term = req.body.term;
let { tersm } = req.query; 
var departments = await models.department.findAll( { where: { department_name: { [Op.like]: '%' + term + '%'} }});
res.render('admin_departments', {page:'Home', menuId:'home', departments: departments});
});


router.get('/add/department', function (req, res, next) {
    res.render('add_department', {page:'Home', menuId:'home'});

    });


    //ADD DEPARTMENT
    router.post('/add/department', async function (req, res, next) {
        console.log(req.body.name);
          let { name } = req.query; 
         await models.department.create({department_name: req.body.name});
        //   console.log(users)
          res.redirect('/admin/departments');
        });

        router.get('/department/:departmentid/add/course', function (req, res, next) {
          res.render('add_course', {page:'Home', menuId:'home', departmentid: req.params["departmentid"]});
          // console.log(req.session.user.id);
   
          });
        //ADD COURSE
        router.post('/department/:departmentid/add/course', async function (req, res, next) {
          console.log(req.body.name);
            let { name } = req.query; 
           await models.courses.create({course_name: req.body.name, departmentid: req.params["departmentid"]});
          //   console.log(users)
            res.redirect('/admin/courses');
          });
  


  router.post('/login', async(req, res)=>{
    console.log(req.body.email);
    var user = await models.adminusers.findOne( { where: {email: req.body.email}});
    console.log(user);
  
    if(user != null){
   
     
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err){
              console.log(err);
          }
          if(isMatch){

              console.log("is a match");
              req.session.user = user;
              res.redirect('/');

  
          }
          else{
              console.log( "Password not correct" );
          }
      });
  }else{
      return console.log( "Email not registered" );
  }
  });

module.exports = router;