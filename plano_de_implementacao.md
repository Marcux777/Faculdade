# Plano de Implementação: Sistema de Gerenciamento de Cinema

Este documento descreve o plano para a implementação de uma aplicação completa de **gerenciamento de cinema**, incluindo um banco de dados PostgreSQL, um serviço de backend com funcionalidades CRUD e uma interface de frontend para interação do usuário.

As entidades principais do sistema são: **Filmes, Salas, Sessões e Ingressos**.

## 1. Visão Geral do Projeto

O objetivo é construir uma aplicação web full-stack que permita aos usuários realizar operações de Criar, Ler, Atualizar e Excluir (CRUD) nos dados do cinema.

- [ ] **Banco de Dados:** PostgreSQL para persistência dos dados.
- [x] **PostgreSQL:** Configurado com Docker e conectado via Prisma.
- [x] **Backend:** Uma API RESTful para gerenciar os dados.
- [x] **Frontend:** Uma interface de usuário web para interagir com a API.

## 2. Configuração do Ambiente de Desenvolvimento

- [x] **Node.js e npm (ou Yarn):** Instalado e utilizado nos projetos.
- [ ] **PostgreSQL:** A ser configurado e conectado.
- [x] **Git:** O projeto está versionado.
- [x] **Um editor de código:** Em uso.
- [ ] **Uma ferramenta de API:** Necessária para testar o backend.

## 3. Implementação do Banco de Dados (PostgreSQL com Prisma)

- [ ] **Atividade:** Definir o `schema.prisma` com os modelos para `Filme`, `Sala`, `Sessao` e `Ingresso`.
- [ ] **Atividade:** Executar o `prisma migrate dev` para criar o banco de dados e as tabelas.
- [x] **Atividade:** Definir o `schema.prisma` com os modelos para `Filme`, `Sala`, `Sessao` e `Ingresso`.
- [x] **Atividade:** Executar o `prisma migrate dev` para criar o banco de dados e as tabelas.

## 4. Desenvolvimento do Backend (API RESTful em TypeScript)

O backend será responsável pela lógica de negócio e pela comunicação com o banco de dados via Prisma.

### 4.1. Estrutura do Projeto Backend

- [x] **Atividade:** Definir a arquitetura e a estrutura de pastas do projeto (`cinema-ts-api`).

### 4.2. Conexão com o PostgreSQL

- [x] **Atividade:** Configurar a conexão do Prisma com o banco de dados no arquivo `.env`.

### 4.3. Implementação do CRUD

- [x] **Atividade:** Criar os endpoints da API para cada operação CRUD para as 4 entidades.
    - [x] **Filmes:** `POST, GET, PUT, DELETE /filmes`
    - [x] **Salas:** `POST, GET, PUT, DELETE /salas`
    - [x] **Sessões:** `POST, GET, PUT, DELETE /sessoes`
    - [x] **Ingressos:** `POST, GET, PUT, DELETE /ingressos`

## 5. Desenvolvimento do Frontend (React)

O frontend é a interface com a qual o usuário irá interagir.

### 5.1. Estrutura do Projeto Frontend

- [x] **Atividade:** Configurar o projeto frontend (`cinema-react`).

### 5.2. Criação dos Componentes de UI

- [x] **Atividade:** Desenvolver os componentes visuais da aplicação.
    - [x] Páginas criadas para `Filmes`, `Salas`, `Sessões` e `Ingressos`.
    - [x] Componentes de UI (listas, formulários, botões) provavelmente já existem dentro das páginas.

### 5.3. Integração com o Backend

- [x] **Atividade:** Conectar o frontend com a API do backend.
    - [x] Implementar ou finalizar as funções no diretório `services` para fazer requisições HTTP para os endpoints do backend.
    - [x] Conectar os formulários e botões para que chamem as funções de serviço apropriadas.

## 6. Cronograma de Implementação (Status Atual)

- [x] **Estrutura do Frontend:** Concluída.
- [x] **Páginas e Componentes de UI:** Concluídos.
- [x] **Definição do Schema do Banco de Dados:** Concluída.
- [x] **Implementação do Backend (CRUD):** Concluído.
- [x] **Integração Frontend-Backend:** Concluída.

## 7. Próximos Passos

- [x] Implementar o `schema.prisma`.
- [x] Desenvolver todos os endpoints da API no backend.
- [x] Conectar os componentes React existentes com a API.
- [ ] Realizar testes completos do fluxo CRUD.
- [ ] Autenticação e autorização de usuários.
- [ ] Deploy da aplicação.
- [x] Implementar o `schema.prisma`.
- [x] Desenvolver todos os endpoints da API no backend (Salas, Sessões, Ingressos).
- [x] Conectar os componentes React existentes com a API (Salas, Sessões, Ingressos).
- [ ] Realizar testes completos do fluxo CRUD.
- [ ] Autenticação e autorização de usuários.
- [ ] Deploy da aplicação. 