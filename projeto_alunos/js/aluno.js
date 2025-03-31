// Classe Aluno para representar os dados de um aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Método para verificar se o aluno está aprovado
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Método para formatar os dados do aluno
    toString() {
        return `${this.nome} (${this.idade} anos) - ${this.curso} - Nota: ${this.notaFinal}`;
    }
}

// Exportar a classe para uso em outros arquivos (se necessário)
// module.exports = Aluno; // Descomentar se for usar com Node.js
