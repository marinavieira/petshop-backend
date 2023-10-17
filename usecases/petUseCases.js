const { pool } = require('../config');
const Pet = require('../entities/pet');

const getPetsDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM pets ORDER BY nome`);
        return rows.map((pet) => new Pet(pet.codigo, pet.nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addPetDB = async (body) => {
    try {
        const { nome, idade, descricao, ativo, data_consulta } = body;
        const results = await pool.query(`INSERT INTO pets (nome,idade,descricao,ativo,data_consulta) 
            VALUES ($1,$2,$3,$4,$5)
            returning codigo, nome,idade,descricao,ativo,data_consulta`,
            [nome, idade, descricao, ativo, data_consulta]);
        const pet = results.rows[0];
        return new Pet(pet.codigo, pet.nome, pet.idade, pet.descricao, pet.ativo, pet.data_consulta);
    } catch (err) {
        throw "Erro ao inserir a pet: " + err;
    }
}


const updatePetDB = async (body) => {
    try {
        const { codigo, nome, idade, descricao, ativo, data_consulta } = body;
        const results = await pool.query(`UPDATE pets set nome = $2, idade= $3, descricao= $4, ativo= $5, data_consulta= $6 where codigo = $1 
        returning codigo, nome,idade,descricao,ativo,data_consulta`,
            [codigo, nome, idade, descricao, ativo, data_consulta]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const pet = results.rows[0];
        return new Pet(pet.codigo, pet.nome, pet.idade, pet.descricao, pet.ativo, pet.data_consulta);
    } catch (err) {
        throw "Erro ao alterar a pet: " + err;
    }
}

const deletePetDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM pets where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Pet removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a pet: " + err;
    }
}

const getPetPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM pets where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const pet = results.rows[0];
            return new Pet(pet.codigo, pet.nome, pet.idade, pet.descricao, pet.ativo, pet.data_consulta);
        }
    } catch (err) {
        throw "Erro ao recuperar a pet: " + err;
    }
}

module.exports = {
    getPetsDB, addPetDB, updatePetDB, deletePetDB, getPetPorCodigoDB
}