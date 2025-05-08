const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./role.model");

const User = sequelize.define("User", {
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	roleType: { type: DataTypes.STRING },
	otp: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	otpExpiresAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	isVerified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
