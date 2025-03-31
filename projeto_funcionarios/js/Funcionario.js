class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // Método para formatar os dados do funcionário
    toString() {
        return `${this.nome} (${this.idade} anos) - ${this.cargo} - R$ ${this.salario.toFixed(2)}`;
    }

    // Método para calcular aumento salarial
    aumentarSalario(percentual) {
        this.salario *= (1 + percentual/100);
    }
}
