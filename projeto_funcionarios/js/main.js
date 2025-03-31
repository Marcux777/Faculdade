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

        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => carregarParaEdicao(index));
        li.appendChild(btnEditar);

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirFuncionario(index));
        li.appendChild(btnExcluir);

        listaFuncionarios.appendChild(li);
    });
}

// Função para carregar dados para edição
function carregarParaEdicao(index) {
    const funcionario = funcionarios[index];
    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('idade').value = funcionario.idade;
    document.getElementById('cargo').value = funcionario.cargo;
    document.getElementById('salario').value = funcionario.salario;

    // Armazenar índice do funcionário sendo editado
    formFuncionario.dataset.editando = index;
    formFuncionario.querySelector('button[type="submit"]').textContent = 'Atualizar';
}

// Função para excluir funcionário
function excluirFuncionario(index) {
    if (confirm('Deseja realmente excluir este funcionário?')) {
        funcionarios.splice(index, 1);
        atualizarLista();
    }
}

// Event listener para o formulário
formFuncionario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    if (this.dataset.editando !== undefined) {
        // Editar funcionário existente
        const index = parseInt(this.dataset.editando);
        funcionarios[index] = new Funcionario(nome, idade, cargo, salario);
        delete this.dataset.editando;
        this.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    } else {
        // Cadastrar novo funcionário
        cadastrarFuncionario(nome, idade, cargo, salario);
    }

    atualizarLista();
    this.reset();
});

// Adicionar alguns funcionários de exemplo
document.addEventListener('DOMContentLoaded', () => {
    cadastrarFuncionario('João Silva', 30, 'Desenvolvedor', 5000);
    cadastrarFuncionario('Maria Souza', 28, 'Designer', 4500);
});
