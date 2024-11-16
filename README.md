
Implementação do Desafio
Criação das Tabelas no init.sql
Criei as tabelas user e post no arquivo SQL, incluindo todos os campos especificados e o relacionamento entre elas. Isso garante que os dados sejam armazenados de forma organizada e que o banco de dados suporte as operações necessárias.

Criação das Entidades User e Post
Desenvolvi as entidades User e Post no TypeORM para mapear as tabelas do banco de dados em objetos no código. Isso facilita as operações de CRUD e mantém a aplicação modular e escalável.

Configuração dos Endpoints users e posts
Implementei endpoints REST para criar usuários e posts. Esses endpoints permitem interações via HTTP, como envio de dados para o banco e a criação de novas entradas.

Configuração do Dockerfile
Configurei o Dockerfile para que a aplicação possa ser construída e executada em um ambiente Docker. Isso garante consistência no ambiente de execução, independentemente da máquina utilizada.

Teste da Aplicação
Testei a aplicação usando Docker Compose e comandos para verificar se os serviços estavam funcionando corretamente. Também executei testes automatizados para validar a criação de usuários e posts, garantindo que tudo funcionasse conforme o esperado.



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
   docker exec -it <Container Name> /bin/sh
   
   ```

   Dentro do container, execute o teste:
   ```bash
   npm test
   ```

## 6º Passo: Crie um fork desse repositório e submita o código preenchido nele.
Crie um Pull Request para a brach master nos enviando o código


-------------------------------------------------------------------------------
