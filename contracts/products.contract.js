const pactum = require('pactum');

describe('Contrato de Produtos', () => {
  it('Contrato para addProduct', async () => {
    await pactum.spec()
      .post('http://lojaebac.ebaconline.art.br/graphql')
      .withGraphQL({
        query: `
          mutation {
            addProduct(name: "Produto de Teste", categoryId: "1") {
              id
              name
            }
          }
        `
      })
      .expectStatus(200)
      .expectJsonLike({
        data: {
          addProduct: {
            id: 'string',
            name: 'Produto de Teste'
          }
        }
      });
  });
});
