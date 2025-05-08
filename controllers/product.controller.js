const { Product } = require("../models");
const { Op } = require("sequelize");

exports.createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const [updated] = await Product.update(req.body, { where: { id } });
		if (updated) {
			const updatedProduct = await Product.findByPk(id);
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Product.destroy({ where: { id } });
		if (deleted) {
			res.json({ message: "Product deleted" });
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// GET with pagination and filtering
exports.getAllProducts = async (req, res) => {
	try {
		const { page = 1, size = 10, category, available, minPrice, maxPrice } = req.query;

		const where = {};
		if (category) where.category = category;
		if (available !== undefined) where.available = available === "true";
		if (minPrice || maxPrice) {
			where.price = {};
			if (minPrice) where.price[Op.gte] = Number(minPrice);
			if (maxPrice) where.price[Op.lte] = Number(maxPrice);
		}

		const limit = parseInt(size);
		const offset = (parseInt(page) - 1) * limit;

		const { rows, count } = await Product.findAndCountAll({
			where,
			limit,
			offset,
			order: [["created_at", "DESC"]],
		});

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / limit),
			currentPage: parseInt(page),
			products: rows,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({ message: "Product not found" });
		res.json(product);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
