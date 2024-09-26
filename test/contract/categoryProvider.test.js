const { reporter, flow, mock, handler } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'Loja EBAC API';
  pf.config.version = '1.0.2'; // Alterar a versão para evitar conflitos
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

// global after
after(async () => {
  await mock.stop();
  await reporter.end();
});

handler.addInteractionHandler('Category Response', () => {
  return {
    provider: 'lojaebac-api',
    flow: 'Add Category',
    request: {
      method: 'POST',
      path: '/graphql',
      body: {
        query: `
          mutation AddCategory($name: String!, $photo: String) {
            addCategory(name: $name, photo: $photo) {
              name
              photo
            }
          }
        `,
        variables: {
          name: "Nova Categoria",
          photo: "https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
        }
      },
      response: {
        status: 200,
        body: {
          "data": {
            "addCategory": {
              "name": "Nova Categoria",
              "photo": "https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
            }
          }
        }
      }
    }
  }
});


it('API - add a new category successfully', async () => {
  console.log('Starting test: Add Category');
  
  const res = await flow('Add Category')
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
      mutation AddCategory($name: String!, $photo: String) {
        addCategory(name: $name, photo: $photo) {
          name
          photo
        }
      }
    `)
    .withGraphQLVariables({
      name: "Nova Categoria",
      photo: "https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
    })
    .expectStatus(200)
    .inspect();  // Log the request/response details

  console.log('Response:', res.body);
  console.log('Expected:', 'Nova Categoria');
  
  res.expectJson('data.addCategory.name', 'Nova Categoria')
    .expectJson('data.addCategory.photo', 'https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp');
});

