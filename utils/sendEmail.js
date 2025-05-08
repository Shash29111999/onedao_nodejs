// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
// 	host: "sandbox.smtp.mailtrap.io",
// 	port: 587,
// 	secure: false, // Use `true` for SSL
// 	auth: {
//	user: "process.env.EMAIL_USER", // generated ethereal user
// 		pass: "process.env.EMAIL_PASS", // generated ethereal password

// 	},
// 	tls: {
// 		ciphers: "SSLv3", //You can remove this
// 		rejectUnauthorized: false,
// 	},
// });

// const sendEmail = async (to, subject, text) => {
// 	try {
// 		await transporter.sendMail({
// 			from: process.env.EMAIL_USER,
// 			to,
// 			subject,
// 			text,
// 		});
// 	} catch (error) {
// 		console.log("Error sending email:", error);
// 		console.error("Email send error:", error);
// 		throw error;
// 	}
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "localhost",
	port: 1025,
	ignoreTLS: true,
});

const sendEmail = async (to, subject, text) => {
	await transporter.sendMail({
		from: '"My App" <no-reply@example.com>',
		to,
		subject,
		text,
	});
};

module.exports = sendEmail;
