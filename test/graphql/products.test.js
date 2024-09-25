const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br/graphql')

describe('Products API', () => {

  it('add a new product', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation AddProduct($name: String, $price: Float, $photos: [String]) {
        addProduct(name: $name, price: $price, photos: $photos) {
            name
            price
            photos
        }
        }
      `)
      .withGraphQLVariables({
        name: 'Caneca de Argila',
        price: 37.9,
        photo: 'https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp' })
      .expectStatus(200);
  });

  it('edit a product', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation EditProduct($name: String, $price: Float, $editProductId: ID!) {
        editProduct(name: $name, price: $price, id: $editProductId) {
            name
            price
        }
        }
      `)
      .withGraphQLVariables({
        name: "Suporte de Notebook", 
        price: 87.50,
        editProductId: 4
      })
      .expectStatus(200)
      .expectJson('data.editProduct.name', null);
  });

  it('delete a product', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation DeleteProduct($deleteProductId: ID!) {
        deleteProduct(id: $deleteProductId) {
            name
        }
        }
      `)
      .withGraphQLVariables({
        deleteProductId: 4 
      })
      .expectStatus(200)
      .expectJson('data.deleteProduct.name', null);
  });
});
