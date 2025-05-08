const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_DB, process.env.POSTGRESQL_USERNAME, process.env.POSTGRESQL_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
