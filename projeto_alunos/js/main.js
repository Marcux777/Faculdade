// Array para armazenar os alunos
let alunos = [];

// Elementos do DOM
const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

// Função para adicionar um novo aluno
function adicionarAluno(nome, idade, curso, nota) {
    const aluno = {
        id: Date.now(), // ID único baseado no timestamp
        nome,
        idade,
        curso,
        nota
    };
    alunos.push(aluno);
    atualizarTabela();
}

// Função para editar um aluno existente
function editarAluno(id, nome, idade, curso, nota) {
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex !== -1) {
        alunos[alunoIndex] = { id, nome, idade, curso, nota };
        atualizarTabela();
    }
}

// Função para excluir um aluno
function excluirAluno(id) {
    alunos = alunos.filter(aluno => aluno.id !== id);
    atualizarTabela();
}

// Função para atualizar a tabela no DOM
function atualizarTabela() {
    tabelaAlunos.innerHTML = '';

    alunos.forEach(aluno => {
        const row = tabelaAlunos.insertRow();

        row.insertCell(0).textContent = aluno.nome;
        row.insertCell(1).textContent = aluno.idade;
        row.insertCell(2).textContent = aluno.curso;
        row.insertCell(3).textContent = aluno.nota;

        const cellAcoes = row.insertCell(4);

        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = () => carregarFormularioEdicao(aluno.id);
        cellAcoes.appendChild(btnEditar);

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-excluir';
        btnExcluir.onclick = () => excluirAluno(aluno.id);
        cellAcoes.appendChild(btnExcluir);
    });
}

// Função para carregar dados no formulário para edição
function carregarFormularioEdicao(id) {
    const aluno = alunos.find(aluno => aluno.id === id);
    if (aluno) {
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('nota').value = aluno.nota;

        // Alterar o botão para "Atualizar" e armazenar o ID sendo editado
        formAluno.dataset.editando = id;
        formAluno.querySelector('button[type="submit"]').textContent = 'Atualizar';
    }
}

// Event listener para o formulário
formAluno.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const nota = parseFloat(document.getElementById('nota').value);

    // Verificar se está editando ou adicionando novo
    if (this.dataset.editando) {
        const id = parseInt(this.dataset.editando);
        editarAluno(id, nome, idade, curso, nota);

        // Resetar o formulário após edição
        delete this.dataset.editando;
        this.querySelector('button[type="submit"]').textContent = 'Salvar';
    } else {
        adicionarAluno(nome, idade, curso, nota);
    }

    this.reset();
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar alguns alunos de exemplo
    adicionarAluno('João Silva', 20, 'Engenharia', 8.5);
    adicionarAluno('Maria Souza', 22, 'Medicina', 9.2);
    adicionarAluno('Carlos Oliveira', 19, 'Direito', 7.8);
});
