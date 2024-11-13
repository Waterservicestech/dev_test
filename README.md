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


## Acessar Swagger da aplicação

---

A aplicação inclui uma documentação interativa da API gerada pelo Swagger. Para acessar a documentação Swagger, siga os passos abaixo:

1. **Inicie a aplicação**: Certifique-se de que a aplicação está em execução. Você pode iniciar a aplicação usando Docker Compose conforme descrito na seção de teste da aplicação.

2. **Acesse a documentação**: Abra seu navegador web e adicione `/api-docs` ao final da URL base da aplicação. Por exemplo, se a aplicação estiver rodando localmente na porta 3000, a URL para acessar a documentação Swagger será:

---

## Logs da Aplicação

---

A aplicação contém logs detalhados para ajudar a entender o que está acontecendo durante a execução. Os logs são úteis para depuração e monitoramento do comportamento da aplicação. Aqui estão algumas informações sobre como os logs são gerados e onde você pode encontrá-los:

1. **Configuração dos Logs**: Os logs são configurados usando um middleware de logging. Certifique-se de que o middleware de logging está corretamente configurado no arquivo principal da aplicação (`src/index.ts`).

2. **Tipos de Logs**:
   - **Informativos**: Logs que informam sobre o estado geral da aplicação, como inicialização do servidor e conexão com o banco de dados.
   - **Erros**: Logs que capturam erros e exceções que ocorrem durante a execução da aplicação.
   - **Requisições HTTP**: Logs que registram detalhes sobre as requisições HTTP recebidas pela aplicação, incluindo método, URL, status da resposta e tempo de processamento.

3. **Acessando os Logs**:
   - **Console**: Durante o desenvolvimento, os logs são geralmente exibidos no console onde a aplicação está sendo executada.
   - **Arquivos de Log**: Em ambientes de produção, os logs podem ser configurados para serem gravados em arquivos para análise posterior.

4. **Exemplo de Log**:
   ```plaintext
   [INFO] 2023-10-01 12:00:00 - Server is running on port 3000
   [INFO] 2023-10-01 12:00:05 - Data Source initialized successfully
   [ERROR] 2023-10-01 12:01:00 - Failed to create user: ValidationError: Email is required
   [HTTP] 2023-10-01 12:02:00 - POST /api/users 201 120ms

---

## Dockerfile Multi-Stage Build

---

O Dockerfile da aplicação utiliza uma abordagem de multi-stage build para otimizar o processo de construção e reduzir o tamanho da imagem final. Aqui está uma explicação detalhada dos stages e como eles funcionam:

### Stage 1: Build

```dockerfile
FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
```

### Stage2: Production
```
FROM node:14-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

RUN npm install --only=production

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```