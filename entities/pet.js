class Pet {
    constructor(codigo, nome, idade, descricao, ativo, data_consulta){
        this.codigo = codigo;
        this.nome = nome;
        this.idade = idade;
        this.descricao = descricao;
        this.ativo = ativo;
        this.data_consulta = data_consulta;
    }
}

module.exports = Pet;