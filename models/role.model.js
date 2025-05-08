const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
  name: { type: DataTypes.STRING, unique: true }
});

module.exports = Role;
