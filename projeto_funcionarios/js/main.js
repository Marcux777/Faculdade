// Array para armazenar funcionários
let funcionarios = [];

// Elementos do DOM
const formFuncionario = document.getElementById('formFuncionario');
const listaFuncionarios = document.querySelector('#listaFuncionarios ul');

// Função para cadastrar novo funcionário
function cadastrarFuncionario(nome, idade, cargo, salario) {
    const funcionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(funcionario);
    atualizarLista();
    console.log('Funcionário cadastrado:', funcionario.toString());
}

// Função para atualizar a lista no DOM
function atualizarLista() {
    listaFuncionarios.innerHTML = '';

    funcionarios.forEach((funcionario, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = funcionario.toString();
        li.appendChild(span);

        // Botão Editar com função anônima
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', function() {
            const func = buscarFuncionario(index);
            document.getElementById('nome').value = func.nome;
            document.getElementById('idade').value = func.idade;
            document.getElementById('cargo').value = func.cargo;
            document.getElementById('salario').value = func.salario;
            formFuncionario.dataset.editando = index;
            formFuncionario.querySelector('button[type="submit"]').textContent = 'Atualizar';
        });
        li.appendChild(btnEditar);

        // Botão Excluir com função anônima
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', function() {
            if (confirm('Deseja realmente excluir este funcionário?')) {
                funcionarios = filtrarFuncionario(index);
                atualizarLista();
            }
        });
        li.appendChild(btnExcluir);

        listaFuncionarios.appendChild(li);
    });
}

// Buscar funcionário por índice usando arrow function
const buscarFuncionario = index => funcionarios.find((f, i) => i === index);

// Filtrar funcionário para exclusão usando arrow function
const filtrarFuncionario = index => funcionarios.filter((f, i) => i !== index);

// Event listener para o formulário com função anônima
formFuncionario.addEventListener('submit', e => {
    e.preventDefault();

    const getFormData = () => ({
        nome: document.getElementById('nome').value,
        idade: parseInt(document.getElementById('idade').value),
        cargo: document.getElementById('cargo').value,
        salario: parseFloat(document.getElementById('salario').value)
    });

    const {nome, idade, cargo, salario} = getFormData();

    if (e.target.dataset.editando !== undefined) {
        // Editar usando arrow function
        const index = parseInt(e.target.dataset.editando);
        funcionarios = funcionarios.map((f, i) =>
            i === index ? new Funcionario(nome, idade, cargo, salario) : f
        );
        delete e.target.dataset.editando;
        e.target.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    } else {
        // Cadastrar novo
        cadastrarFuncionario(nome, idade, cargo, salario);
    }

    atualizarLista();
    e.target.reset();
});

// Funções de relatório
const mostrarSalariosAltos = () => {
    const salariosAltos = funcionarios.filter(f => f.salario > 5000);
    const resultado = salariosAltos.map(f => `${f.nome}: R$ ${f.salario.toFixed(2)}`).join('<br>');
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Funcionários com salário > R$5000 (${salariosAltos.length})</h3>${resultado || 'Nenhum funcionário'}`;
};

const calcularMediaSalarial = () => {
    const media = funcionarios.reduce((sum, f) => sum + f.salario, 0) / funcionarios.length || 0;
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Média Salarial</h3>R$ ${media.toFixed(2)}`;
};

const listarCargosUnicos = () => {
    const cargos = [...new Set(funcionarios.map(f => f.cargo))];
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Cargos Únicos</h3>${cargos.join('<br>') || 'Nenhum cargo cadastrado'}`;
};

const listarNomesMaiusculo = () => {
    const nomes = funcionarios.map(f => f.nome.toUpperCase());
    document.getElementById('resultadoRelatorios').innerHTML =
        `<h3>Nomes em Maiúsculo</h3>${nomes.join('<br>') || 'Nenhum funcionário'}`;
};

// Event listeners para relatórios
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar funcionários de exemplo
    cadastrarFuncionario('João Silva', 30, 'Desenvolvedor', 5000);
    cadastrarFuncionario('Maria Souza', 28, 'Designer', 4500);
    cadastrarFuncionario('Carlos Oliveira', 35, 'Gerente', 8000);
    cadastrarFuncionario('Ana Santos', 32, 'Desenvolvedor', 5500);

    // Configurar eventos
    document.getElementById('btnSalarioAlto').addEventListener('click', mostrarSalariosAltos);
    document.getElementById('btnMediaSalarial').addEventListener('click', calcularMediaSalarial);
    document.getElementById('btnCargosUnicos').addEventListener('click', listarCargosUnicos);
    document.getElementById('btnNomesMaiusculo').addEventListener('click', listarNomesMaiusculo);
});
