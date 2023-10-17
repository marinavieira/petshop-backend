const { Router } = require('express');

const { getPets, addPet, updatePet, deletePet, getPetPorCodigo } = require('../controllers/petController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasPets = new Router();

rotasPets.route('/pet')
   .get(verificaJWT , getPets)
   .post(verificaJWT , addPet)
   .put(verificaJWT , updatePet)

rotasPets.route('/pet/:codigo')
   .get(verificaJWT , getPetPorCodigo)
   .delete(verificaJWT , deletePet)

module.exports = { rotasPets };