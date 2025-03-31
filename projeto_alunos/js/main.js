// Array para armazenar os alunos
let alunos = [];

// Elementos do DOM
const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

// Função para adicionar um novo aluno
const adicionarAluno = (nome, idade, curso, notaFinal) => {
    const alunoObj = new Aluno(nome, idade, curso, notaFinal);
    const aluno = {
        id: Date.now(), // ID único baseado no timestamp
        ...alunoObj
    };
    alunos.push(aluno);
    atualizarTabela();
    console.log(`Novo aluno adicionado: ${nome}`);
};

// Função para editar um aluno existente
const editarAluno = (id, nome, idade, curso, notaFinal) => {
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex !== -1) {
        const alunoObj = new Aluno(nome, idade, curso, notaFinal);
        alunos[alunoIndex] = { id, ...alunoObj };
        atualizarTabela();
        console.log(`Aluno ${nome} editado com sucesso!`);
    }
};

const excluirAluno = id => {
    const aluno = alunos.find(a => a.id === id);
    alunos = alunos.filter(aluno => aluno.id !== id);
    atualizarTabela();
    alert(`Aluno ${aluno?.nome || ''} removido com sucesso!`);
};

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
        btnEditar.addEventListener('click', function() {
            carregarFormularioEdicao(aluno.id);
            console.log(`Editando aluno ${aluno.nome}`);
        });
        cellAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-excluir';
        btnExcluir.addEventListener('click', function() {
            if (confirm(`Deseja realmente excluir ${aluno.nome}?`)) {
                excluirAluno(aluno.id);
            }
        });
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

formAluno.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('nota').value);

    if (e.target.dataset.editando) {
        const id = parseInt(e.target.dataset.editando);
        editarAluno(id, nome, idade, curso, notaFinal);
        delete e.target.dataset.editando;
        e.target.querySelector('button[type="submit"]').textContent = 'Salvar';
        alert('Aluno atualizado com sucesso!');
    } else {
        adicionarAluno(nome, idade, curso, notaFinal);
        alert('Aluno cadastrado com sucesso!');
    }

    e.target.reset();
});

// Funções de relatório
const mostrarAprovados = () => {
    const aprovados = alunos.filter(aluno => aluno.notaFinal >= 7);
    const resultado = aprovados.map(aluno => `${aluno.nome} (${aluno.notaFinal})`).join('<br>');
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Alunos Aprovados (${aprovados.length})</h3>${resultado || 'Nenhum aluno aprovado'}`;
};

const calcularMediaNotas = () => {
    const media = alunos.reduce((sum, aluno) => sum + aluno.notaFinal, 0) / alunos.length || 0;
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Média das Notas</h3>${media.toFixed(2)}`;
};

const calcularMediaIdades = () => {
    const media = alunos.reduce((sum, aluno) => sum + aluno.idade, 0) / alunos.length || 0;
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Média das Idades</h3>${media.toFixed(1)} anos`;
};

const listarOrdemAlfabetica = () => {
    const ordenados = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));
    const resultado = ordenados.map(aluno => aluno.nome).join('<br>');
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Alunos em Ordem Alfabética</h3>${resultado || 'Nenhum aluno cadastrado'}`;
};

const mostrarAlunosPorCurso = () => {
    const cursos = {};
    alunos.forEach(aluno => {
        cursos[aluno.curso] = (cursos[aluno.curso] || 0) + 1;
    });

    let resultado = '';
    for (const [curso, quantidade] of Object.entries(cursos)) {
        resultado += `${curso}: ${quantidade} aluno(s)<br>`;
    }

    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Alunos por Curso</h3>${resultado || 'Nenhum aluno cadastrado'}`;
};

// Event listeners para os relatórios
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAprovados').addEventListener('click', mostrarAprovados);
    document.getElementById('btnMediaNotas').addEventListener('click', calcularMediaNotas);
    document.getElementById('btnMediaIdades').addEventListener('click', calcularMediaIdades);
    document.getElementById('btnOrdemAlfabetica').addEventListener('click', listarOrdemAlfabetica);
    document.getElementById('btnAlunosPorCurso').addEventListener('click', mostrarAlunosPorCurso);

    // Adicionar alunos de exemplo
    adicionarAluno('João Silva', 20, 'Engenharia', 8.5);
    adicionarAluno('Maria Souza', 22, 'Medicina', 9.2);
    adicionarAluno('Carlos Oliveira', 19, 'Direito', 7.8);
});
