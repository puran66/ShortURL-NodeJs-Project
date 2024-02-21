const express = require('express');
const { userController } = require('../controllers');
const route = express();

route.post('/create-url',userController.createUrl)

// route.get('/:shortid',userController.handleredirectUrl)

route.get('/:shortId',userController.redirectUrl)

route.get('/',userController.homePage)


module.exports = route;