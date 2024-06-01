//src/routes/routes_auth
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/controllers_auth');

router.post('/login', authControllers.login);
router.post('/register', authControllers.register);

module.exports = router;