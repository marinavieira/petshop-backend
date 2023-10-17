const { Router } = require('express');

const { rotasPets } = require('./rotasPets');

const { rotasClientes} = require('./rotasClientes');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasPets);
rotas.use(rotasClientes);

module.exports = rotas;