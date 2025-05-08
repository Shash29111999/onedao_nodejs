const express = require('express');
const router = express.Router();
const { signup, signin,verifyEmail } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify_otp',verifyEmail );


module.exports = router;
