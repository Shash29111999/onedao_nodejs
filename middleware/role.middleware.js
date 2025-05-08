module.exports = (requiredRole) => (req, res, next) => {
	if (req.user.roleType !== requiredRole) return res.status(403).json({ message: "Forbidden" });
	next();
};
