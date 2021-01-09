const express = require('express');
const routes = express.Router();
const DevController = require('./Controllers/DevController')


routes.post('/login',DevController.store)
routes.post('/like',DevController.like)
routes.post('/dislike',DevController.dislike)
routes.post('/loadUsers',DevController.index)

module.exports = routes;