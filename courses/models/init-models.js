var DataTypes = require("sequelize").DataTypes;
var _adminusers = require("./adminusers");
var _comments = require("./comments");
var _courses = require("./courses");
var _department = require("./department");
var _skills = require("./skills");
var _user_course = require("./user_course");
var _users = require("./users");

function initModels(sequelize) {
  var adminusers = _adminusers(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var skills = _skills(sequelize, DataTypes);
  var user_course = _user_course(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(courses, { foreignKey: "coursesid"});
  courses.hasMany(comments, { foreignKey: "coursesid"});
  courses.belongsTo(department, { foreignKey: "departmentid"});
  department.hasMany(courses, { foreignKey: "departmentid"});
  skills.belongsTo(courses, { foreignKey: "coursesid"});
  courses.hasMany(skills, { foreignKey: "coursesid"});
  user_course.belongsTo(courses, { foreignKey: "coursesid"});
  users.belongsToMany(courses, { through: user_course, foreignKey: "userid", otherKey: "coursesid" });
  courses.hasMany(user_course, { foreignKey: "coursesid"});
  user_course.belongsTo(users, { foreignKey: "userid"});
  courses.belongsToMany(users, { through: user_course, foreignKey: "coursesid", otherKey: "userid" });
  users.hasMany(user_course, { foreignKey: "userid"});

  return {
    adminusers,
    comments,
    courses,
    department,
    skills,
    user_course,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
