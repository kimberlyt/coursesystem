/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skills', {
    skillsid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    coursesid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'courses',
        key: 'coursesid'
      }
    }
  }, {
    sequelize,
    tableName: 'skills',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "skills_pkey",
        unique: true,
        fields: [
          { name: "skillsid" },
        ]
      },
    ]
  });
};
