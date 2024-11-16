# API de cadastro de usuários e de postagens
Esta API permite criar novos usuários e postagens associadas a esses usuários.

## Endpoints

#### POST /users
Esse endpoint é responsável por inserir novos usuários no banco de dados.

##### Corpo da requisição
```
{
  "firstName": "Nome do Usuário",
  "lastName": "Sobrenome do Usuário",
  "email": "email@exemplo.com"
}
```
#####  Respostas
##### OK 201
Caso essa resposta aconteça, o usuário foi cadastrado com sucesso no banco de dados.

Exemplo de resposta:
```
{
  "id": 1,
  "firstName": "Nome do Usuário",
  "lastName": "Sobrenome do Usuário",
  "email": "email@exemplo.com"
}
```

##### Falha na requisição !400
Essa falha ocorre quando algum campo obrigatório está ausente ou contém valores inválidos.
Exemplo de resposta:
```
{
  "error": "Campos obrigatórios ausentes ou inválidos"
}
```

#### POST /posts
Esse endpoint é responsável por inserir novas postagens no banco de dados, associando-as a um usuário existente.

##### Corpo da requisição
```
{
  "title": "Título da Postagem",
  "description": "Descrição da Postagem",
  "userId": 1
}
```
#### Respostas
##### OK 201
Caso essa resposta aconteça, a postagem foi cadastrada com sucesso no banco de dados.

Exemplo de resposta:
```
{
  "title": "Título da Postagem",
  "description": "Descrição da Postagem",
  "user": {
    "id": 1,
    "firstName": "Nome do Usuário",
    "lastName": "Sobrenome do Usuário",
    "email": "email@exemplo.com"
  },
   "id": 4
}
```
##### Falha na autenticação!400
Essa falha ocorre quando algum campo obrigatório está ausente ou contém valores inválidos.
Exemplo de resposta:
```
{
    "message": "Campos obrigatórios não preenchidos"
}
```

## EndPoints Extras

#### GET /users
 Esse endpoint é responsável por buscar e retornar todos os usuários cadastrados no banco de dados.

##### Corpo da requisição
Nenhum corpo é necessário para essa requisição.

#### Respostas
##### OK 200
Caso essa resposta aconteça, todos os usuários foram recuperados com sucesso do banco de dados.

Exemplo de resposta:
```
[
  {
    "id": 1,
    "firstName": "Nome do Usuário",
    "lastName": "Sobrenome do Usuário",
    "email": "email@gmail.com"
  },
  {
    "id": 2,
    "firstName": " Nome2",
    "lastName": "Sobrenome2",
    "email": "email2@gmail.com"
  }
]
```
##### Erro interno 500
Essa falha ocorre quando há um problema ao tentar recuperar os dados do banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao buscar usuários",
  "error": "Detalhes do erro"
}
```

#### GET /users/:id
 Esse endpoint é responsável por buscar e retornar um usuário específico com base no id fornecido como parâmetro de rota.
#####  Parâmetros de Rota
id (número): O identificador único do usuário que será buscado.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, o usuário foi encontrado com sucesso e retornado.

Exemplo de resposta:
```
{
  "id": 1,
  "firstName": "Nome do Usuário",
  "lastName": "Sobrenome do Usuário",
  "email": "email@exemplo.com"
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.

Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Usuário não encontrado 404
Essa falha ocorre quando não existe um usuário com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Usuário não encontrado"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar recuperar os dados do banco de dados.
Exemplo de resposta:
```
{
  "message": "Erro ao buscar usuário",
  "error": "Detalhes do erro"
}
```

#### DELETE /users/:id
 Esse endpoint é responsável por deletar um usuário específico com base no id fornecido como parâmetro de rota.

#### Parâmetros de Rota
id (número): O identificador único do usuário que será deletado.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, o usuário foi deletado com sucesso.

Exemplo de resposta:
```
{
  "message": "Usuário deletado com sucesso"
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.

Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Usuário não encontrado 404
Essa falha ocorre quando não existe um usuário com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Usuário não encontrado"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar deletar o usuário no banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao deletar usuário",
  "error": "Detalhes do erro"
}
```

#### PUT /users/:id
Esse endpoint é responsável por atualizar as informações de um usuário específico com base no id fornecido como parâmetro de rota. Os campos a serem atualizados são enviados no corpo da requisição.

#### Parâmetros de Rota
id (número): O identificador único do usuário que será atualizado.
#### Parâmetros de Rota
```
{
  "firstName": "Novo Nome",
  "lastName": "Novo Sobrenome",
  "email": "novoemail@exemplo.com"
}
```
Os campos no corpo da requisição são opcionais. Caso algum campo não seja fornecido, o valor atual do usuário será mantido para aquele campo.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, o usuário foi atualizado com sucesso.

Exemplo de resposta:
```
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "id": 1,
    "firstName": "Novo Nome",
    "lastName": "Novo Sobrenome",
    "email": "novoemail@exemplo.com"
  }
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.
Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Usuário não encontrado 404
Essa falha ocorre quando não existe um usuário com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Usuário não encontrado"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar atualizar o usuário no banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao atualizar usuário",
  "error": "Detalhes do erro"
}
```


#### GET /posts
 Esse endpoint é responsável por buscar e retornar todas as postagens cadastradas no banco de dados, incluindo as informações do usuário associado a cada postagem.

#### Corpo da requisição
Nenhum corpo é necessário para essa requisição.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, todas as postagens foram recuperadas com sucesso do banco de dados.

Exemplo de resposta:
```
[
  {
    "id": 1,
    "title": "Título da Postagem",
    "description": "Descrição da Postagem",
    "user": {
      "id": 1,
      "firstName": "Nome do Usuário",
      "lastName": "Sobrenome do Usuário",
      "email": "email@gmail.com"
    }
  },
  {
    "id": 2,
    "title": "Postagem2",
    "description": "Descrição da Postagem2",
    "user": {
      "id": 2,
      "firstName": "Nome2",
      "lastName": " Sobrenome2",
      "email": "email2@gmail.com"
    }
  }
]
```
##### Erro interno 500
Essa falha ocorre quando há um problema ao tentar recuperar as postagens no banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao buscar postagens",
  "error": "Detalhes do erro"
}
```

#### GET /posts/:id
Esse endpoint é responsável por buscar e retornar uma postagem específica com base no id fornecido como parâmetro de rota, incluindo as informações do usuário associado à postagem.
#### Parâmetros de Rota
id (número): O identificador único da postagem que será buscada.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, a postagem foi encontrada com sucesso, e as informações da postagem e do usuário associado são retornadas.

Exemplo de resposta:
```
{
  "id": 1,
  "title": "Título da Postagem",
  "description": "Descrição da Postagem",
  "user": {
    "id": 1,
    "firstName": "Nome do Usuário",
    "lastName": "Sobrenome do Usuário",
    "email": "email@exemplo.com"
  }
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.

Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Postagem não encontrada 404
Essa falha ocorre quando não existe uma postagem com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Postagem não encontrada"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar recuperar a postagem no banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao buscar postagem",
  "error": "Detalhes do erro"
}
```

#### DELETE /users/:id
Esse endpoint é responsável por excluir uma postagem específica com base no id fornecido como parâmetro de rota.
#### Parâmetros de Rota
id (número): O identificador único da postagem que será deletada.

#####  Respostas
##### OK 200
Caso essa resposta aconteça, a postagem foi deletada com sucesso do banco de dados.

Exemplo de resposta:
```
{
  "message": "Postagem deletada com sucesso"
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.

Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Postagem não encontrada 404
Essa falha ocorre quando não existe uma postagem com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Postagem não encontrada"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar deletar a postagem no banco de dados.

Exemplo de resposta:
```
{
  "message": "Erro ao deletar postagem",
  "error": "Detalhes do erro"
}
```

#### PUT /posts/:id
Esse endpoint é responsável por atualizar os detalhes de uma postagem específica com base no id fornecido como parâmetro de rota.

#### Parâmetros de Rota
id (número): O identificador único da postagem que será atualizada.
#### Corpo da Requisição
title (string): O título da postagem. Opcional, se não fornecido, o valor atual será mantido.
description (string): A descrição da postagem. Opcional, se não fornecido, o valor atual será mantido

Exemplo de Corpo da Requisição
```
{
  "title": "Novo Título da Postagem",
  "description": "Nova descrição da postagem"
}
```

#####  Respostas
##### OK 200
Caso essa resposta aconteça, a postagem foi atualizada com sucesso.

Exemplo de resposta:
```
{
  "message": "Postagem atualizada com sucesso",
  "post": {
    "id": 1,
    "title": "Novo título da Postagem",
    "description": "Nova descrição da Postagem",
    "user": {
      "id": 1,
      "firstName": "Nome do Usuário",
      "lastName": "Sobrenome do Usuário",
      "email": "email@exemplo.com"
    }
  }
}
```
##### Falha na requisição 400
Essa falha ocorre quando o id fornecido não é um número válido.

Exemplo de resposta:
```
{
  "message": "ID inválido"
}
```
##### Postagem não encontrada 404
Essa falha ocorre quando não existe uma postagem com o id fornecido.

Exemplo de resposta:
```
{
  "message": "Postagem não encontrada"
}
```
##### Erro interno do servidor 500
Essa falha ocorre quando há um problema ao tentar atualizar a postagem no banco de dados.
Exemplo de resposta:
```
{
  "message": "Erro ao atualizar postagem",
  "error": "Detalhes do erro"
}
```