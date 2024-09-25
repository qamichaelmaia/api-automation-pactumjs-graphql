# Automação de API: GraphQLe PactumJS

- Categorias (addCategory, editCategory, deleteCategory)
- Produtos (addProduct, editProduct, deleteProduct)

# Descrição dos Testes
- Testes de Usuário
    Os testes de usuário verificam as operações CRUD básicas para um usuário. Isso inclui a criação de um novo usuário, a leitura de informações de um usuário existente, a atualização de informações de um usuário e a exclusão de um usuário.

- Testes de Login
    Os testes de login verificam se a autenticação e a autorização funcionam corretamente. Isso inclui testar se um usuário pode fazer login com credenciais válidas e se um token de acesso é retornado.

- Testes de Categoria
    Os testes de categoria verificam se as operações de adicionar, editar ou deletar estão funcionando corretamente. Isso inclui testar se um usuário pode adicionar uma nova categoria, editar uma categoria existente, ou deletar uma categoria escolhida.

- Testes de Produtos
    Os testes de produtos verificam se as operações de adicionar, editar ou deletar estão funcionando corretamente. Isso inclui testar se um usuário pode adicionar um novo produto, editar os seus dados, ou deletar um produto escolhido.

# Estrutura do Projeto
O projeto é estruturado da seguinte maneira:

- tests/: Diretório que contém todos os arquivos de teste;
- user.test.js: Arquivo de teste para operações de usuário;
- login.test.js: Arquivo de teste para operações de login;
- category.test.js: Arquivo de teste para operações de categoria;
- products.test.js: Arquivo de teste para operações de produtos.

## Pré-requisitos

- Node.js
- npm

## Dependências

- pactum
- pactum-matchers
- mocha
- graphql

## Instalação

Instale as dependências do projeto executando o seguinte comando:

```bash
npm install
```

## Execução dos Testes
Para executar os testes, execute o seguinte comando:
```bash
npm test
npm t
```

## Chave utilizada

```bash
docker run --name pactbroker-db -e POSTGRES_PASSWORD=ebac -e POSTGRES_USER=ebac -e PGDATA=/var/lib/postgresql/data/pgdata -v pgdata:/var/lib/postfresql/data -d postgres

docker run -it --link pactbroker-db:postgres --rm postgres sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U ebac'

CREATE USER pactbrokeruser WITH PASSWORD 'root';

CREATE DATABASE pactbroker WITH OWNER pactbrokeruser ;

GRANT ALL PRIVILEGES ON DATABASE pactbroker TO pactbrokeruser;

docker run --name pactbroker --link pactbroker-db:postgres -e PACT_BROKER_DATABASE_USERNAME=pactbrokeruser -e PACT_BROKER_DATABASE_PASSWORD=root -e PACT_BROKER_DATABASE_HOST=postgres -e PACT_BROKER_DATABASE_NAME=pactbroker -d -p 9292:9292 pactfoundation/pact-broker
```