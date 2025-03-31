// Classe Aluno para representar os dados de um aluno
class Aluno {
    constructor(id, nome, idade, curso, notaFinal) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Método para formatar os dados do aluno
    toString() {
        return `${this.nome} (${this.idade} anos) - ${this.curso} - Nota: ${this.notaFinal}`;
    }
}

// Exportar a classe para uso em outros arquivos (se necessário)
// module.exports = Aluno; // Descomentar se for usar com Node.js
