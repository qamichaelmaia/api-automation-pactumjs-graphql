const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br/graphql')

describe('Category API', () => {

  it('add a new category', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation AddCategory($name: String!, $photo: String) {
          addCategory(name: $name, photo: $photo) {
            name
            photo
          }
        }
      `)
      .withGraphQLVariables({
        name: 'Nova Categoria',
        photo: 'https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp' })
      .expectStatus(200);
  });

  it('edit a category', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation EditCategory($editCategoryId: ID!, $name: String) {
          editCategory(id: $editCategoryId, name: $name) {
            name
          }
        }
      `)
      .withGraphQLVariables({
        editCategoryId: 4, 
        name: 'Brechó'
      })
      .expectStatus(200);
  });

  it('delete a category', async () => {
    await spec()
      .post('/')
      .withGraphQLQuery(`
        mutation DeleteCategory($deleteCategoryId: ID!) {
          deleteCategory(id: $deleteCategoryId) {
            name
          }
        }
      `)
      .withGraphQLVariables({
        deleteCategoryId: 4 
      })
      .expectStatus(200)
      .expectJson('data.deleteCategory.name', null);
  });
});
