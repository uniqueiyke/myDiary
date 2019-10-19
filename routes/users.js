const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/registration', usersController.registerUser);

router.post('/registration', usersController.createUser);

module.exports = router;