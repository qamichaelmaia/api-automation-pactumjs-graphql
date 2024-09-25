const pactum = require('pactum');

describe('Testes de Categorias', () => {
  const baseUrl = 'http://lojaebac.ebaconline.art.br/graphql';

  it('Adicionar Categoria', async () => {
    await pactum.spec()
      .post(baseUrl)
      .withGraphQLQuery(`
        mutation {
          addCategory(name: "Teste de Categoria", photo: "https://example.com/photo.jpg") {
            name
            // Remover o campo 'id' se não for retornado
          }
        }
      `)
      .expectStatus(200)
      .expectJsonLike({
        data: {
          addCategory: {
            name: "Teste de Categoria"
          }
        }
      });
  });

  it('Editar Categoria', async () => {
    await pactum.spec()
      .post(baseUrl)
      .withGraphQLQuery(`
        mutation {
          editCategory(id: "1", name: "Categoria Editada") {
            name
            // Remover o campo 'id' se não for retornado
          }
        }
      `)
      .expectStatus(200)
      .expectJsonLike({
        data: {
          editCategory: {
            name: "Categoria Editada"
          }
        }
      });
  });

  it('Deletar Categoria', async () => {
    await pactum.spec()
      .post(baseUrl)
      .withGraphQLQuery(`
        mutation {
          deleteCategory(id: "1") {
            success // Verifique se o campo 'success' é realmente retornado
          }
        }
      `)
      .expectStatus(200)
      .expectJsonLike({
        data: {
          deleteCategory: {
            success: true // Ajuste se o valor esperado for diferente
          }
        }
      });
  });
});
