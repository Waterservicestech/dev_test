# Descrição do Teste para a Vaga de Desenvolvedor Jr.


## Documentação do projeto para execução 
Ao realizar o projeto surgiu algumas dúvidas. Enviei um email mas ninguém respondeu. Portanto fiz de duas formas. Criei a versão simples que está na branch master e a mais elaborada que se encontra na branch release. 

### Executando o projeto

- instale as dependências do projeto executando o comando abaixo
```bash 
$  npm i
```

- execute o container com o comando abaixo 
```bash 
# sem visualizar os logs 
$ docker compose up --build -d

# caso queira ver os logs 
$  docker compose up --build 
```
- execução dos testes 
```bash 
# execute o comando para acessar a pasta da API dentro do container
$ docker exec -it <Container Name> /bin/sh

# execute o comando para executar os testes
$  npm run test
```
- OBS: Espere os logs do banco de dados executarem para o funcionamento do projeto corretamente

## Contextualização do Desafio

Este teste foi desenvolvido para avaliar suas habilidades práticas em tarefas comuns do dia a dia de um desenvolvedor júnior. Através deste desafio, você terá a oportunidade de demonstrar seu conhecimento na criação de banco de dados, definição de relacionamentos entre tabelas e entidades, além de aplicar boas práticas de desenvolvimento em um ambiente Docker. O objetivo é simular uma situação real de desenvolvimento de uma aplicação simples, onde você deverá criar as estruturas necessárias e garantir que o sistema esteja funcionando corretamente por meio de testes. A conclusão bem-sucedida desta tarefa refletirá seu domínio de conceitos importantes para a vaga.

## 1º Passo: Criação das Tabelas no `init.sql`

Dentro do arquivo `init.sql`, crie as seguintes tabelas:

### Tabela `user`
- **id** – Tipo: `Int`, autoincremental, chave primária (PK).
- **firstName** – Tipo: `Varchar(100)`, não nulo.
- **lastName** – Tipo: `Varchar(100)`, não nulo.
- **email** – Tipo: `Varchar(100)`, não nulo.

### Tabela `post`
- **id** – Tipo: `Int`, autoincremental, chave primária (PK).
- **title** – Tipo: `Varchar(100)`, não nulo.
- **description** – Tipo: `Varchar(100)`, não nulo.
- **userId** – Tipo: `Int`, não nulo (chave estrangeira referenciando a tabela `user`).

---

## 2º Passo: Criação das Entidades `User` e `Post`

Dentro da pasta `src/Entity`, crie as entidades correspondentes às tabelas `User` e `Post`.

---

## 3º Passo: Configurar endpoints `users` e `posts`

Dentro de `src/index.ts`, configure dois endpoints `users` & `posts`

---

## 4º Passo: Configuração do Dockerfile

Configure o `Dockerfile` da aplicação para garantir que ela seja construída corretamente no ambiente Docker.

---

## 5º Passo: Teste da Aplicação

Execute os seguintes comandos para testar a aplicação:

1. **Subir a aplicação utilizando Docker Compose**:
   ```bash
   docker compose up --build
   docker exec -it <Container Name> /bin/sh
   
   ```

   Dentro do container, execute o teste:
   ```bash
   npm test
   ```

## 6º Passo: Crie um fork desse repositório e submita o código preenchido nele.
Crie um Pull Request para a brach master nos enviando o código
