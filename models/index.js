const sequelize = require("../config/db");
const User = require("./user.model");
const Role = require("./role.model");
const Product = require("./product.model");

const init = async () => {
	await sequelize.sync({ force: false }); // or { force: true } for dev
};

module.exports = { sequelize, User, Role, Product, init };
