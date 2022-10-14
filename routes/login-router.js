const router = require('express').Router();
const jwt = require('jsonwebtoken');
const loginController = require('../controller/login-controller');

router.post('/login', loginController.login);
router.post('/register', loginController.register);


module.exports = router;