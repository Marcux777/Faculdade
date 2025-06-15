# Memória do Projeto: Sistema de Gerenciamento de Cinema

Este documento serve como um registro cronológico das decisões tomadas e das ações realizadas durante o desenvolvimento do projeto.

## 1. Análise Inicial e Planejamento

-   **Objetivo:** Implementar uma aplicação full-stack (CRUD) com Frontend, Backend e Banco de Dados.
-   **Análise:** Ao investigar a estrutura de pastas do projeto, identificamos um frontend em React (`cinema-react`) com páginas para "Filmes", "Salas", "Sessões" e "Ingressos". Isso definiu o escopo do projeto como um **Sistema de Gerenciamento de Cinema**.
-   **Planejamento:**
    1.  Criamos um arquivo `plano_de_implementacao.md` para guiar o desenvolvimento.
    2.  O plano foi posteriormente convertido em um checklist para facilitar o acompanhamento do progresso.
    3.  O checklist foi atualizado para refletir o escopo do projeto (cinema) e o progresso inicial (frontend parcialmente pronto).

## 2. Configuração do Banco de Dados com Prisma e Docker

Esta foi a etapa mais complexa até agora, envolvendo a configuração completa do ambiente de banco de dados.

### 2.1. Definição do Schema do Banco de Dados

-   **Ação:** Editamos o arquivo `prisma/schema.prisma` para modelar as entidades da aplicação: `Filme`, `Sala`, `Sessao` e `Ingresso`.
-   **Melhorias:**
    -   Refinamos os campos e tipos de dados.
    -   Adicionamos relacionamentos explícitos entre os modelos.
    -   Incluímos a regra `onDelete: Cascade` para garantir a integridade dos dados (ex: ao deletar um filme, suas sessões são deletadas juntas).
    -   Adicionamos constraints de unicidade (`@@unique`) para evitar dados duplicados.

### 2.2. Superando Desafios de Conectividade

-   **Problema 1: Variável de Ambiente Ausente**
    -   **Ocorrência:** A primeira tentativa de rodar `npx prisma migrate dev` falhou porque a variável `DATABASE_URL` não estava definida.
    -   **Solução:** Orientamos a criação de um arquivo `.env` com a URL de conexão do PostgreSQL.

-   **Problema 2: Servidor do Banco de Dados Inacessível**
    -   **Ocorrência:** A segunda tentativa de migração falhou pois não havia um servidor PostgreSQL rodando para o Prisma se conectar.
    -   **Solução:** Optamos por usar Docker para gerenciar o banco de dados. Criamos um arquivo `docker-compose.yml` para definir e configurar um serviço PostgreSQL.

-   **Problema 3: Comandos Docker Indisponíveis**
    -   **Ocorrência:** Não foi possível executar `docker-compose` ou `docker` de dentro do ambiente de desenvolvimento do VS Code (o dev container).
    -   **Solução:** O usuário executou os comandos (`docker-compose up -d` e `docker ps`) diretamente no terminal de sua máquina host.

-   **Problema 4: Rede de Contêineres Isolada**
    -   **Ocorrência:** Mesmo com o banco de dados rodando, a aplicação (no dev container) não conseguia se comunicar com o banco de dados (no contêiner do Docker Compose) porque estavam em redes Docker diferentes.
    -   **Solução:**
        1.  Identificamos o nome do dev container (`vibrant_kalam`) e da rede do banco de dados (`faculdade_default`).
        2.  O usuário executou `docker network connect faculdade_default vibrant_kalam` em seu terminal host, conectando os dois contêineres na mesma rede.

### 2.3. Sucesso da Migração

-   **Resultado:** Após resolver os problemas de rede, o comando `npx prisma migrate dev --name init` foi executado com sucesso.
-   **Conclusão da Etapa:** As tabelas e relacionamentos foram criados no banco de dados PostgreSQL, e o Prisma Client foi gerado, deixando tudo pronto para o desenvolvimento do backend.

## 5. Implementação do Backend

Após a configuração inicial, iniciamos a implementação da API RESTful no projeto `cinema-ts-api`.

### 5.1. CRUD de Filmes

-   **Ação:** Criamos `filme.controller.ts`, `filme.routes.ts` e registramos as rotas no `server.ts`.
-   **Resultado:** Endpoints `GET, POST, PUT, DELETE` para `/api/filmes` foram implementados e conectados ao frontend.

### 5.2. CRUD de Salas

-   **Ação:** Replicamos o padrão criando `sala.controller.ts` e `sala.routes.ts`.
-   **Resultado:** Endpoints `GET, POST, PUT, DELETE` para `/api/salas` foram implementados e conectados ao frontend.

### 5.3. CRUD de Sessões e Ingressos

-   **Ação:** Finalizamos a implementação do backend criando os controllers e rotas para `Sessao` e `Ingresso`.
-   **Destaque:** Nas buscas de `Sessao` e `Ingresso`, utilizamos o `include` do Prisma para retornar dados dos seus relacionamentos (Filme, Sala), enriquecendo a resposta da API e simplificando a lógica do frontend.

## 6. Próximos Passos

Com toda a funcionalidade de CRUD implementada e conectada, os próximos passos se concentram em refinar e preparar a aplicação para produção:

-   **Testes:** Realizar testes manuais completos em todo o fluxo de CRUD para garantir que não há bugs.
-   **Autenticação:** Implementar um sistema de login (ex: com JWT) para proteger as rotas.
-   **Deploy:** Publicar a aplicação em um serviço de nuvem.

## 3. Como Executar o Projeto Localmente

A sequência abaixo parte do pressuposto de que você tem **Docker** e **Node.js 18+** instalados na máquina host.

1. **Subir o banco de dados (PostgreSQL):**
   ```bash
   docker compose up -d
   ```
   • Cria o contêiner `cinema-db` (usuário e senha `postgres`).

2. **Configurar variáveis de ambiente:**
   Crie o arquivo `.env` na raiz com:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@postgres:5432/cinema?schema=public"
   PORT=3333
   ```

3. **Instalar dependências e gerar Prisma Client (backend):**
   ```bash
   cd cinema-ts-api
   npm install               # instala Express, Prisma, etc.
   npx prisma generate       # gera o client em node_modules/.prisma/client
   npm run dev               # inicia nodemon na porta 3333
   ```

4. **Instalar dependências do frontend e rodar o Vite:**
   ```bash
   cd ../cinema-react
   npm install               # instala React, Vite, axios...
   npm install date-fns      # dependência usada em SessoesPage.jsx
   npm run dev -- --host     # Vite na porta 5173 (pode mudar)
   ```

5. **Acessar no navegador:**
   • Frontend: `http://localhost:5173` (ou a porta informada pelo Vite).  
   • Backend: `http://localhost:3333/api` – endpoints CRUD de filmes, etc.

## 4. Problemas Solucionados Importantes

- Conflito de versões entre **express 5** e **express-async-errors** → downgrade para *express 4.17*.
- `@prisma/client did not initialize yet` → alinhar versões (`@prisma/client` 6.9.0) e executar `prisma generate`.
- Frontend não iniciava porque faltava **vite** e depois **date-fns** → instalados.
- Comunicação entre contêiner do dev-container e banco de dados → `docker network connect faculdade_default vibrant_kalam`.

---

Agora o projeto completa todo o fluxo:
Frontend React ↔ Backend Express/Prisma ↔ PostgreSQL (Docker). 