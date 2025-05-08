const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
	"Product",
	{
		name: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.TEXT },
		price: { type: DataTypes.FLOAT, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
		category: { type: DataTypes.STRING },
		available: { type: DataTypes.BOOLEAN, defaultValue: true },
		color: { type: DataTypes.STRING },
		size: { type: DataTypes.STRING },
		attributes: { type: DataTypes.JSON },
	},
	{
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Product;
