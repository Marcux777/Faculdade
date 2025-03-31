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

    funcionarios.forEach(funcionario => {
        const li = document.createElement('li');
        li.textContent = funcionario.toString();
        listaFuncionarios.appendChild(li);
    });
}

// Event listener para o formulário
formFuncionario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    cadastrarFuncionario(nome, idade, cargo, salario);
    formFuncionario.reset();
});

// Adicionar alguns funcionários de exemplo
document.addEventListener('DOMContentLoaded', () => {
    cadastrarFuncionario('João Silva', 30, 'Desenvolvedor', 5000);
    cadastrarFuncionario('Maria Souza', 28, 'Designer', 4500);
});
