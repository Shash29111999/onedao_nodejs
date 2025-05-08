const express = require('express');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { adminEndpoint, viewerEndpoint } = require('../controllers/test.controller');

const router = express.Router();

router.get('/admin', auth, role('admin'), adminEndpoint);
router.get('/viewer', auth, role('admin','viewer'), viewerEndpoint);

module.exports = router;
