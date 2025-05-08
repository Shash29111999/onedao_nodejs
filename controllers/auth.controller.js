const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const https = require("https");
const { User, Role } = require("../models");
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");

const BLOCKED_COUNTRIES = ["SY", "AF", "IR"];

exports.signup = async (req, res) => {
	try {
		const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
		const agent = new https.Agent({ rejectUnauthorized: false });

		const geo = await axios.get(`https://ipapi.co/${ip}/json/`, { httpsAgent: agent });

		//To prevent signup from blocked countries ['SY', 'AF', 'IR']
		if (BLOCKED_COUNTRIES.includes(geo.data.country_code)) return res.status(403).json({ message: "Signup blocked in your region" });

		const { email, password, roleType } = req.body;
		const hash = await bcrypt.hash(password, 10);
		const role = await Role.findOne({ where: { name: roleType } });
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
		const isVerified = false; // 10 mins
		const createdAt = new Date();
		const updatedAt = new Date();
		const user = await User.create({ email, password: hash, roleType, otp, otpExpiresAt, isVerified, createdAt, updatedAt, roleId: role.id });
		// Generate 6-digit OTP

		//user.otp = otp;
		//user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
		//await user.save();

		// Send OTP via email
		await sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`);
		res.status(201).json({ message: "User created. Please verify using the OTP sent to your email." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email }, include: "Role" });
		if (!user.isVerified) {
			return res.status(403).json({ message: "Please verify your email using the OTP sent to you." });
		}

		if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user.id, roleType: user.roleType }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.verifyEmail = async (req, res) => {
	const { email, otp } = req.body;

	const user = await User.findOne({ where: { email } });

	if (!user) return res.status(404).json({ message: "User not found" });
	if (user.isVerified) return res.status(400).json({ message: "Already verified" });

	const now = new Date();

	if (user.otp !== otp || now > user.otpExpiresAt) {
		return res.status(400).json({ message: "Invalid or expired OTP" });
	}

	user.isVerified = true;
	user.otp = null;
	user.otpExpiresAt = null;
	await user.save();

	res.json({ message: "Email verified successfully!" });
};
