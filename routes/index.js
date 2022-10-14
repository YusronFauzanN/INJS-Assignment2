const router = require('express').Router();
const loginRouter = require('./login-router');
const crudRouter = require('./crud-router');
const errorMiddleware = require('../middlewares/error-middleware');
const { route } = require('./login-router');
const authMiddleware = require('../middlewares/auth-middleware');

router.use(loginRouter);

router.use(authMiddleware);

router.use(crudRouter);

router.use(errorMiddleware);

module.exports = router;
