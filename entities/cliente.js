class Cliente {
    constructor(codigo, nome, ativo, 
         data_consulta, pet, pet_nome,cpf) {
        this.codigo = codigo;
        this.nome = nome;
        this.ativo = ativo;
        this.data_consulta = data_consulta;
        this.pet = pet;
        this.pet_nome = pet_nome;
        this.cpf = cpf;
    }
}

module.exports = Cliente;