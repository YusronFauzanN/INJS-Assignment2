const router = require('express').Router();
const crudController = require('../controller/crud-controller');

router.post('/create', crudController.create);
router.get('/find', crudController.getAll);


module.exports = router;