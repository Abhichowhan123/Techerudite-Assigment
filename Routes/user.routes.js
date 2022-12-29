const express = require('express');
const router = express.Router();
const user = require('../app/controllers/user-controller');

router.post('/login', user.login);

router.post('/registration', user.registration);

module.exports = router;