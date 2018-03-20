const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('home/index', { title: 'Express' });
});

module.exports = routes;
