# Descrição do Teste para a Vaga de Desenvolvedor Jr.

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
   docker exec -it dev_test-api-1 /bin/sh
   
   ```

   Dentro do container, execute o teste:
   ```bash
   npm test
   ```

## 6º Passo: Crie um fork desse repositório e submita o código preenchido nele.
Crie um Pull Request para a brach master nos enviando o código


