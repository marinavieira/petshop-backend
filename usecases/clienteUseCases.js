const { pool } = require('../config');
const Cliente = require('../entities/cliente')

const getClientesDB = async () => {
    try {
        const { rows } = await pool.query(`select * from clientes`);
        return rows.map((cliente) => new Cliente(cliente.codigo, cliente.nome ,
            cliente.ativo,  cliente.data_consulta, cliente.pet, '', cliente.cpf));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addClienteDB = async (body) => {
    try {
        const { nome, ativo, data_consulta, cpf, pet } = body;
        const results = await pool.query(`INSERT INTO clientes (nome, ativo, data_consulta,cpf, pet) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, nome, ativo,  to_char(data_consulta,'YYYY-MM-DD') as data_consulta,cpf, pet`,
            [nome, ativo, data_consulta, cpf, pet]);
        const cliente = results.rows[0];
        return new Cliente(cliente.codigo, cliente.nome, cliente.ativo, cliente.data_consulta, cliente.pet, null, cliente.cpf);
    } catch (err) {
        throw "Erro ao inserir o cliente: " + err;
    }
}

const updateClienteDB = async (body) => {
    try {
        const {codigo, nome, ativo, data_consulta, cpf, pet } = body;
        const results = await pool.query(`UPDATE clientes set nome = $2 , ativo = $3, data_consulta = $4, 
        cpf = $5, pet = $6 where codigo = $1 
        returning nome,ativo, data_consulta, to_char(data_consulta,'YYYY-MM-DD') as data_consulta, cpf, pet`,
            [codigo, nome, ativo, data_consulta, cpf, pet]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const cliente = results.rows[0];
        return new Cliente(cliente.codigo, cliente.nome, cliente.ativo, cliente.data_consulta, cliente.pet, null, cliente.cpf);
    } catch (err) {
        throw "Erro ao alterar o cliente: " + err;
    }
}

const deleteClienteDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM clientes where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Cliente removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o cliente: " + err;
    }
}

const getClientePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`select p.codigo as codigo, p.nome as nome, p.ativo as ativo, to_char(p.data_consulta,'YYYY-MM-DD') as data_consulta, p.pet as pet,p.cpf as cpf , c.nome as pet_nome
        from clientes p
        join pets c on p.pet = c.codigo where p.codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const cliente = results.rows[0];
            return new Cliente(cliente.codigo, cliente.nome, cliente.ativo, cliente.data_consulta, cliente.pet, "", cliente.cpf);
        }
    } catch (err) {
        throw "Erro ao recuperar o cliente: " + err;
    }
}

module.exports = {
    getClientesDB, addClienteDB, updateClienteDB, deleteClienteDB, getClientePorCodigoDB
}
