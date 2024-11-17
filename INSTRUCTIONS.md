## 💡 Resumo
> <p>Todos os passos foram completados com sucesso. Logo abaixo será listado as funcionalidades extras adicionadas no projeto</p>

<ul>
  <li>Configuração de ambientes de desenvolvimento, teste e produção usando diferentes Dockerfiles</li>
  <li>Documentação</li>
  <li>Validação de input e tratativa de erros customizados</li>
  <li>Dockerize (tech para "esperar" a database ficar pronta)</li>
</ul>


### Pré-requisitos
> Não é preciso seguir estes passos para gerar o build da imagem de produção.

Antes de executar a aplicação em ambiente de DESENVOLVIMENTO e TESTES, é necessário instalar as seguintes extensões no VSCode:

<ul>
  <li>Remote development - Microsoft <b>VSCode extension</b></li>
</ul>

Basta usar o comando no diretório do projeto -> Dev Containers: Reopen in Container

Isso vai executar os arquivos Dockerfile e docker-compose.yml necessários para subir o ambiente. 

### Rodando a aplicação

**🚫 Importante**
- Um arquivo .env ou a plataforma de CI podem conter as keys necessárias para executar a imagem de PRODUÇÃO, caso contrário, irá utilizar as variáveis default.
- O arquivo .env.example está disponível como template.  
</br>

**Para desenvolvimento e testes**
```bash
$ npm run dev

# Abra outro terminal e execute
$ npm run test
```
**Para produção**
```bash
$ docker compose up --build
```
## 📝 Docs

```bash
(GET) http://localhost:3000/docs