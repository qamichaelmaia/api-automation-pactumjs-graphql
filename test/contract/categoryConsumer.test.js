const { reporter, flow, mock, handler } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaebac-front';
  pf.config.projectName = 'Loja EBAC Front';
  pf.config.version = '1.0.0';
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


handler.addInteractionHandler('Category Response',()=>{
  return{
    provider:'lojaebac-front',
    flow: 'Add Category',
    request: {
      method: 'POST',
      path: '/graphql', /// Caminho para o end point
      body: {
        "name": "Nova Categoria",
        "photo": "https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
      },
      response: {
        status: 200,
        body: {
            "success": true,
            "message": "category added",
            "data": {
              "_id": "66f5a9b442524225170155b2",
              "name": "Nova Categoria",
              "photo": "https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp",
              "createdAt": "2024-09-26T18:36:36.181Z",
              "updatedAt": "2024-09-26T18:36:36.181Z",
              "__v": 0
          }
        }
      }
    }
  }
})

it('FRONT - add a new category successfully with authorization', async () => {
  await flow('Add Category')
    .useInteraction('Category Response')
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders({
      'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2Y2RlMWRiYTYwY2ExZWY3ZmEwMzc1ZCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNzM3NTc3MywiZXhwIjoxNzI3NDYyMTczfQ.gqRPWO2XB4Di-JtQzFQZTkmEyJikBee1NTWMf2SDT38'
    })
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
      photo: 'https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp'
    })
    .expectStatus(200)
    .expectJson('data.addCategory.name', 'Nova Categoria')
    .expectJson('data.addCategory.photo', 'https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp');
});
