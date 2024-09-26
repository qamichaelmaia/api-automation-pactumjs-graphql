const { spec } = require('pactum');
const request = require('pactum').request;


describe('Category API - Add Category', () => {
  it('should add a new category successfully', async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addCategory')
      .withHeaders({
        'Content-Type':'application/json'
      })
      .withBody({
        "name": "Nova Categoria",
        "photo": "https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
      })
      .expectStatus(200)
  });

  it('should edit a new category successfully', async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/put_api_editCategory__id_')
      .withHeaders({
        'Content-Type':'application/json'
      })
      .withBody({
        "name": "Brechó"
      })
      .expectStatus(200)
  });
});
