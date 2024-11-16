## Descrição do Projeto

Este projeto é uma aplicação simples construída para avaliar e demonstrar suas habilidades como desenvolvedor júnior. Ele utiliza **Node.js**, **TypeScript**, **Express** e **TypeORM** para criar uma API RESTful com um banco de dados **MySQL**. O projeto inclui a criação de tabelas no banco de dados, entidades relacionadas, e endpoints para a criação de usuários e posts. O ambiente de desenvolvimento e produção está configurado com **Docker**.

## Tecnologias Utilizadas

- **Node.js** (v18-alpine)
- **TypeScript**
- **Express.js**
- **TypeORM**
- **MySQL** (Docker)
- **Axios** (para testar a API)

## Funcionalidades

- **Criação de Usuário**: Permite a criação de usuários com nome, sobrenome e e-mail.
- **Criação de Postagem**: Permite a criação de postagens associadas a usuários.
- **Persistência de Dados**: Os dados são armazenados em um banco de dados MySQL, utilizando o TypeORM para interagir com o banco.
- **Docker**: A aplicação pode ser executada em um ambiente Docker, com configuração de containers para a aplicação e o banco de dados.

## Estrutura do Projeto

```bash
├── src
│   ├── entity
│   │   ├── Post.ts        # Entidade de Post
│   │   └── User.ts        # Entidade de User
│   ├── index.ts           # Configuração do servidor Express e endpoints
├── init.sql               # Script SQL para inicialização do banco de dados
├── Dockerfile             # Dockerfile para a aplicação
├── docker-compose.yml     # Docker Compose para orquestração dos containers
├── package.json           # Dependências e scripts do projeto
└── tsconfig.json          # Configuração do TypeScript
```

## Instalação

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Docker** e **Docker Compose** instalados
- **MySQL** configurado no Docker ou localmente

### Passos para Instalação

1. Clone o repositório para o seu diretório local:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. Instale as dependências do Node.js:

   ```bash
   npm install
   ```

3. Construa e suba os containers do Docker:

   ```bash
   docker compose up --build
   ```

4. Para verificar se a aplicação está funcionando, acesse a URL `http://localhost:3000`.

## Endpoints da API

### POST `/users`

Cria um novo usuário.

#### Parâmetros (Body da Requisição)

- **firstName**: Nome do usuário (string, obrigatório)
- **lastName**: Sobrenome do usuário (string, obrigatório)
- **email**: E-mail do usuário (string, obrigatório)

#### Exemplo de Requisição

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

#### Resposta

- **201 Created**: Usuário criado com sucesso.

### POST `/posts`

Cria um novo post associado a um usuário.

#### Parâmetros (Body da Requisição)

- **title**: Título do post (string, obrigatório)
- **description**: Descrição do post (string, obrigatório)
- **userId**: ID do usuário associado ao post (número, obrigatório)

#### Exemplo de Requisição

```json
{
  "title": "My First Post",
  "description": "This is a description of my first post.",
  "userId": 1
}
```

#### Resposta

- **201 Created**: Post criado com sucesso.

## Testando a Aplicação

Para testar a aplicação, você pode usar os scripts configurados no **`src/index.ts`** para criar usuários e postagens. O código inclui um exemplo de **Axios** que cria um usuário e um post automaticamente ao inicializar a aplicação.

### Passos para Testar

1. Suba os containers com:

   ```bash
   docker compose up --build
   ```

2. Acesse o container do servidor da API:

   ```bash
   docker exec -it <NOME_DO_CONTAINER> /bin/sh
   ```

3. Execute o script de testes dentro do container:

   ```bash
   npm run test
   ```

4. O teste irá criar um usuário e um post automaticamente, e você verá os logs no terminal.

## Docker Compose

A configuração do **Docker Compose** é utilizada para orquestrar dois containers:

- **API**: A aplicação Node.js que expõe os endpoints da API.
- **DB**: O banco de dados MySQL que armazena as informações dos usuários e posts.

### Comandos Docker

- **Subir os containers**:

  ```bash
  docker compose up --build
  ```

- **Parar os containers**:

  ```bash
  docker compose down
  ```

- **Entrar no container da aplicação**:

  ```bash
  docker exec -it <NOME_DO_CONTAINER> /bin/sh
  ```

## Dockerfile

Este projeto inclui um **Dockerfile** configurado para construção e execução em dois estágios:

1. **Builder**: Instala as dependências e compila o TypeScript.
2. **Runner**: Copia o build gerado e executa a aplicação em produção.
