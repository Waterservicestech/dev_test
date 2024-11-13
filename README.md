# DevTest

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js) 
![TypeScript](https://img.shields.io/badge/TypeScript-gray?logo=typescript) 
![Express](https://img.shields.io/badge/Express-lightgrey?logo=express) 
![TypeORM](https://img.shields.io/badge/TypeORM-orange?logo=typeorm) 
![Swagger](https://img.shields.io/badge/Swagger-green?logo=swagger) 
![MySQL](https://img.shields.io/badge/MySQL-white?logo=mysql) 
![Axios](https://img.shields.io/badge/Axios-purple?logo=axios)
![Jest](https://img.shields.io/badge/Jest-red?logo=jest)


## Sumário

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Inicialização do Banco de Dados](#inicialização-do-banco-de-dados)
- [Configuração e Execução](#configuração-e-execução)
- [Testes Automatizados](#testes-automatizados)


## Introdução

O projeto é um desafio para testes de capacidade. O objetivo é criar uma pequena aplicação utilizando Node.js e Express, com suporte de TypeORM e MySQL. A aplicação inclui integrações com documentação Swagger e consumo de dados via Axios.

## Técnologias Utilizadas

- **Node.js** 
- **TypeScript** 
- **Express** 
- **TypeORM** 
- **MySQL** 
- **Swagger**
- **Docker**
- **Jest**

## Estrutura do Projeto

A API é composta por camadas que seguem a arquitetura limpa, com cada camada desempenhando uma função específica, o que facilita a manutenção e a escalabilidade:

- **DTO** (Data Transfer Object): Define os objetos de transferência de dados entre as camadas.
- **Repository**: Camada responsável pela comunicação direta com o banco de dados.
- **Service**: Camada intermediária que coordena a lógica de negócios, realizando a comunicação entre o `Repository` e o `Controller`.
- **Controller**: Interface que gerencia as requisições HTTP e interage com o `Service`.

## Funcionalidades

A API fornece os seguintes endpoints para o gerenciamento de usuários e posts:

- **/user**:
  - `POST /user`: Criação de um novo usuário.
  - `GET /user`: Retorna todos os usuários.
  - `GET /user/{id}`: Retorna um usuário específico pelo `ID`.
  - `DELETE /user/{id}`: Remove um usuário específico pelo `ID`.
  
- **/post**:
  - `POST /post`: Criação de um novo post.
  - `GET /post`: Retorna todos os posts.
  - `GET /post/{id}`: Retorna um post específico pelo `ID`.
  - `DELETE /post/{id}`: Remove um post específico pelo `ID`.

## Inicialização do Banco de Dados

O projeto inclui um arquivo de inicialização de tabelas SQL para criar a estrutura necessária no banco de dados.

## Configuração e Execução

1. **Pré-requisitos**: Certifique-se de ter o Docker instalado.
2. **Dependências do Node**: Executar o comando para instalar

   ```bash
   npm install
   ```

3. **Inicie os containers**: Execute o comando abaixo para inicializar a API e o banco de dados em containers Docker:

   ```bash
   docker-compose up 
   ```

Após iniciar os containers, basta acessar a URL `http://localhost:3000` para utilizar os endpoints da API. A aplicação inclui uma interface de documentação completa com Swagger, acessível em `http://localhost:3000/docs`, o que permite uma visualização clara e detalhada de todos os endpoints disponíveis.

Além disso, há um arquivo de collections do Postman incluído no projeto para facilitar o teste e a validação das funcionalidades da API.

## Testes Automatizados

A aplicação possui uma suíte de testes automatizados desenvolvida com Jest para garantir a integridade e a funcionalidade dos endpoints. Os testes podem ser executados sem a necessidade de iniciar manualmente a aplicação, proporcionando um processo de verificação mais ágil e eficiente. Para rodar os testes, utilize o seguinte comando:

``` bash
npm run jest
```

Essa abordagem assegura que os endpoints sejam validados em um ambiente controlado, permitindo a identificação rápida de possíveis problemas e garantindo a estabilidade do código em desenvolvimento.