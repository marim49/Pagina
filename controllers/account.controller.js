const routes = require('express').Router();
const accountHelper = require('../helpers/account.helper');

routes.get('/login', (req, res) => {
    res.render('account/login');
});

routes.post('/login', (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        res.render('account/login', { error: 'Preencha todos os campos' });
    }
    if (accountHelper.checkPassword(username, password)) {
        res.send('logged in');
    } else {
        res.render('account/login', { error: 'Usuário ou senha inválidos' });
    }
});

routes.get('/signup', (req, res) => {
    res.render('account/signup');
});

routes.post('/signup', (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.render('account/signup', { error: 'Preencha todos os campos' });
    }
    accountHelper.createAccount(username, email, password);
    res.render('account/signup', { success: 'Conta criada com sucesso' });
});

module.exports = routes;
