const routes = require('express').Router();
const { signup, login, getUserProfile } = require('../AuthController/UserController');
const authMiddleware = require('../middleware/auth');

routes.post('/signup', signup);
routes.post('/login', login);
routes.get('/user', authMiddleware, getUserProfile);

module.exports = routes;