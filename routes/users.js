const router = require('express').Router();
const usersController = require('../controllers/users-controller');

router.get('/registration', usersController.registerUser);

router.post('/registration', usersController.createUser);

router.get('/login', usersController.loginUser);

router.post('/login', usersController.loginUserPost);

module.exports = router;