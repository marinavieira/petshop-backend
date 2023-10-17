const { Router } = require('express');

const {  getClientes, addCliente, updateCliente, deleteCliente, getClientePorCodigo } = require('../controllers/clienteController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasClientes = new Router();

rotasClientes.route('/cliente')
   .get(verificaJWT , getClientes)
   .post(verificaJWT , addCliente)
   .put(verificaJWT , updateCliente)

rotasClientes.route('/cliente/:codigo')
   .get(verificaJWT , getClientePorCodigo)
   .delete(verificaJWT , deleteCliente)

module.exports = { rotasClientes };