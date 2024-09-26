const { spec, response } = require('pactum');
const request = require('pactum').request;


describe('Category API - Add Product', () => {

  it('should add a new product successfully', async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addProduct')
      .withHeaders({
        'Content-Type':'application/json'
      })
      .withBody({
        "name": "Novo Produto",
        "photo": "https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
      })
      .expectStatus(200)
  });

  it('should edit a new product successfully', async () => {
    await spec()
      .put('http://lojaebac.ebaconline.art.br/api-docs/#/default/put_api_editProduct__66f474e4290080a9ed9b747b_')
      .withHeaders({
        'Content-Type':'application/json'
      })
      .withBody({
            "name": "Suporte de Monitor",
            "price": "75.9",
            "quantity": "5",
            "description": "Suporte articular para monitor 27"
      })
      .expectStatus(200)
  });
});
