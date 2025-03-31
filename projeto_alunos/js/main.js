// Array para armazenar os alunos
let alunos = [];

// Elementos do DOM
const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

// Função para adicionar um novo aluno
function adicionarAluno(nome, idade, curso, notaFinal) {
    const alunoObj = new Aluno(nome, idade, curso, notaFinal);
    const aluno = {
        id: Date.now(), // ID único baseado no timestamp
        ...alunoObj
    };
    alunos.push(aluno);
    atualizarTabela();
}

// Função para editar um aluno existente
function editarAluno(id, nome, idade, curso, notaFinal) {
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex !== -1) {
        const alunoObj = new Aluno(nome, idade, curso, notaFinal);
        alunos[alunoIndex] = { id, ...alunoObj };
        atualizarTabela();
    }
}

function excluirAluno(id) {
    alunos = alunos.filter(aluno => aluno.id !== id);
    atualizarTabela();
}

function atualizarTabela() {
    tabelaAlunos.innerHTML = '';

    alunos.forEach(aluno => {
        const row = tabelaAlunos.insertRow();

        const alunoObj = new Aluno(aluno.nome, aluno.idade, aluno.curso, aluno.notaFinal);
        row.insertCell(0).textContent = alunoObj.nome;
        row.insertCell(1).textContent = alunoObj.idade;
        row.insertCell(2).textContent = alunoObj.curso;
        row.insertCell(3).textContent = alunoObj.notaFinal;
        row.insertCell(4).textContent = alunoObj.isAprovado() ? 'Aprovado' : 'Reprovado';

        const cellAcoes = row.insertCell(4);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = () => carregarFormularioEdicao(aluno.id);
        cellAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-excluir';
        btnExcluir.onclick = () => excluirAluno(aluno.id);
        cellAcoes.appendChild(btnExcluir);
    });
}

function carregarFormularioEdicao(id) {
    const aluno = alunos.find(aluno => aluno.id === id);
    if (aluno) {
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('nota').value = aluno.notaFinal;

        formAluno.dataset.editando = id;
        formAluno.querySelector('button[type="submit"]').textContent = 'Atualizar';
    }
}

formAluno.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('nota').value);

    if (this.dataset.editando) {
        const id = parseInt(this.dataset.editando);
        editarAluno(id, nome, idade, curso, notaFinal);

        delete this.dataset.editando;
        this.querySelector('button[type="submit"]').textContent = 'Salvar';
    } else {
        adicionarAluno(nome, idade, curso, notaFinal);
    }

    this.reset();
});

document.addEventListener('DOMContentLoaded', () => {
});
