/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    coursesid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    departmentid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'department',
        key: 'departmentid'
      }
    }
  }, {
    sequelize,
    tableName: 'courses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "courses_pkey",
        unique: true,
        fields: [
          { name: "coursesid" },
        ]
      },
    ]
  });
};
