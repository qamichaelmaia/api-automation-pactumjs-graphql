const pactum = require('pactum');

describe('Contrato de Categorias', () => {
  it('Contrato para addCategory', async () => {
    await pactum.spec()
      .post('http://lojaebac.ebaconline.art.br/graphql')
      .withGraphQL({
        query: `
          mutation {
            addCategory(name: "Categoria de Teste") {
              id
              name
            }
          }
        `
      })
      .expectStatus(200)
      .expectJsonLike({
        data: {
          addCategory: {
            id: 'string',
            name: 'Categoria de Teste'
          }
        }
      });
  });
});
