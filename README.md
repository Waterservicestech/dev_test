# Users and Posts

Esta é uma simples aplicação utilizando NodeJs e Python, para demonstrar conhecimentos basicos de criação de banco de dados, configuração do docker, além do uso das linguagens usadas

- [Instalação](#instalação)
- [Uso](#uso)
- [Comandos no container](#comandos-no-container)
- [Melhorias do Projeto](#melhorias-do-projeto)

## Instalação

1. **Clone o repositório**

   ```sh
   git clone git@github.com:Gabrielbm2/users-and-posts.git
   cd users-and-posts
   ```

2. **Escolher o projeto**

Dentro do arquivo users-and-posts deve ser escolhido qual projeto rodar, Node ou Python

3. **Configurar as variaveis de ambiente**

   Crie o `.env` arquivo no diretorio raiz do arquivo Node ou Python:

   ```env
    DB_USER=
    DB_HOST=
    DB_DATABASE=
    DB_PASSWORD=
    DB_PORT=
   ```

4. **Iniciar Docker Compose**
   ```sh
   docker-compose up -d
   ```

## Uso

Ao iniciar o projeto pelo docker-compose, você pode utilizar as seguintes URLs:

Node:

```urls
GET - http://localhost:3000/users
GET - http://localhost:3000/posts?userId=
POST - http://localhost:3000/users
POST - http://localhost:3000/posts
```

Python:

```urls
GET - http://localhost:5000/users
GET - http://localhost:5000/posts?userId=
POST - http://localhost:5000/users
POST - http://localhost:5000/posts
```

## Comando no container

Com o projeto rodando no docker, utilize esses comandos para rodar os testes:

- `docker exec -it node-app_node-1 /bin/sh`: npm test
- `/docker exec -it python-app_python-1 /bin/sh`: python db.test.py

## Melhorias do projeto

1. **Uso de Framework**

Este projeto simples foi desenvolvido para demonstrar conhecimentos básicos de criação de banco de dados e interação com APIs usando Node.js e Python. Embora seja funcional, para sistemas mais robustos e complexos, seria ideal utilizar frameworks mais completos como Express ou NestJS para o Node.js, e Flask ou Django para o Python. Esses frameworks oferecem recursos adicionais, como roteamento, middleware, validação de dados e gerenciamento de dependências, tornando o desenvolvimento de sistemas escaláveis mais eficiente.

2. **Arquitetura**

Devido à simplicidade do projeto, a arquitetura segue um modelo básico com apenas a entidade de usuário e post, e um arquivo index para controle das operações. Contudo, para projetos maiores e mais organizados, seria benéfico adotar um padrão arquitetural mais robusto, como o MVC (Model-View-Controller). Com o uso de padrões como Repository e Controller, seria possível separar melhor a lógica de negócios e a manipulação de dados, facilitando a manutenção e escalabilidade do sistema. A utilização de uma arquitetura bem definida ajudaria na reutilização de código, testes mais eficazes e uma organização mais limpa do projeto.

3. **Documentação**

Embora o projeto tenha funcionalidade básica, ele poderia ser significativamente melhorado com a adição de uma documentação interativa, como o Swagger, para os endpoints da API. O Swagger permitiria uma visualização e teste dinâmico dos endpoints diretamente do navegador, facilitando o entendimento da API e agilizando o processo de testes. Além disso, a documentação poderia incluir descrições detalhadas para cada endpoint, explicando os parâmetros necessários, tipos de resposta esperados e possíveis erros, o que tornaria o desenvolvimento de clientes mais simples e as integrações mais claras.# Users and Posts

Esta é uma simples aplicação utilizando NodeJs e Python, para demonstrar conhecimentos basicos de criação de banco de dados, configuração do docker, além do uso das linguagens usadas

- [Instalação](#instalação)
- [Uso](#uso)
- [Comandos no container](#comandos-no-container)
- [Melhorias do Projeto](#melhorias-do-projeto)

## Instalação

1. **Clone o repositório**

   ```sh
   git clone git@github.com:Gabrielbm2/users-and-posts.git
   cd users-and-posts
   ```

2. **Escolher o projeto**

Dentro do arquivo users-and-posts deve ser escolhido qual projeto rodar, Node ou Python

3. **Configurar as variaveis de ambiente**

   Crie o `.env` arquivo no diretorio raiz do arquivo Node ou Python:

   ```env
    DB_USER=
    DB_HOST=
    DB_DATABASE=
    DB_PASSWORD=
    DB_PORT=
   ```

4. **Iniciar Docker Compose**
   ```sh
   docker-compose up -d
   ```

## Uso

Ao iniciar o projeto pelo docker-compose, você pode utilizar as seguintes URLs:

Node:

```urls
GET - http://localhost:3000/users
GET - http://localhost:3000/posts?userId=
POST - http://localhost:3000/users
POST - http://localhost:3000/posts
```

Python:

```urls
GET - http://localhost:5000/users
GET - http://localhost:5000/posts?userId=
POST - http://localhost:5000/users
POST - http://localhost:5000/posts
```

## Comandos no container

Com o projeto rodando no docker, utilize esses comandos para rodar os testes:

- `docker exec -it node-app_node-1 /bin/sh`: npm test
- `docker exec -it python-app_python-1 /bin/sh`: python db.test.py

## Melhorias do projeto

1. **Uso de Framework**

Este projeto simples foi desenvolvido para demonstrar conhecimentos básicos de criação de banco de dados e interação com APIs usando Node.js e Python. Embora seja funcional, para sistemas mais robustos e complexos, seria ideal utilizar frameworks mais completos como Express ou NestJS para o Node.js, e Flask ou Django para o Python. Esses frameworks oferecem recursos adicionais, como roteamento, middleware, validação de dados e gerenciamento de dependências, tornando o desenvolvimento de sistemas escaláveis mais eficiente.

2. **Arquitetura**

Devido à simplicidade do projeto, a arquitetura segue um modelo básico com apenas a entidade de usuário e post, e um arquivo index para controle das operações. Contudo, para projetos maiores e mais organizados, seria benéfico adotar um padrão arquitetural mais robusto, como o MVC (Model-View-Controller). Com o uso de padrões como Repository e Controller, seria possível separar melhor a lógica de negócios e a manipulação de dados, facilitando a manutenção e escalabilidade do sistema. A utilização de uma arquitetura bem definida ajudaria na reutilização de código, testes mais eficazes e uma organização mais limpa do projeto.

3. **Tratamento de erros**

Tratamento de Erros: Para um sistema mais robusto, é necessario incluir tratamento de erros adequado para todas as operações críticas. No Node.js, seria usado try/catch e um middleware global para tratamento de erros. No Python, seria usado try/except para ajudar a lidar com exceções.

4. **Documentação**

Embora o projeto tenha funcionalidade básica, ele poderia ser significativamente melhorado com a adição de uma documentação interativa, como o Swagger, para os endpoints da API. O Swagger permitiria uma visualização e teste dinâmico dos endpoints diretamente do navegador, facilitando o entendimento da API e agilizando o processo de testes. Além disso, a documentação poderia incluir descrições detalhadas para cada endpoint, explicando os parâmetros necessários, tipos de resposta esperados e possíveis erros, o que tornaria o desenvolvimento de clientes mais simples e as integrações mais claras.
