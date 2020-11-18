/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_course', {
    coursesid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'courses',
        key: 'coursesid'
      }
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    the_length: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_course',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_course_pkey",
        unique: true,
        fields: [
          { name: "coursesid" },
          { name: "userid" },
        ]
      },
    ]
  });
};
