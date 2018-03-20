const routes = require('express').Router();
const homeController = require('./controllers/home.controller');
const accountController = require('./controllers/account.controller');

routes.use('/account', accountController);
routes.use('/', homeController);

module.exports = routes;
