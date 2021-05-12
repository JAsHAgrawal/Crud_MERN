const express = require('express');
const route = express.Router();
const Controller = require('../controller/controller');
const Auth = require('../middlewares/authmiddleware')
// API
// route.post('/api/users', controller.create);
// route.get('/api/users/', controller.find);
// route.get('/api/users/:id', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);
// route.post('/api/users/',controller.create);
route.get('/home',Auth.requireAuth,Controller.home_get);
route.get('/signup', Controller.signup_get);
route.post('/signup', Controller.signup_post);
route.get('/login', Controller.login_get);
route.post('/login', Controller.login_post);
route.post('/getuser',Auth.requireAuth,Controller.getuser_post);


module.exports = route