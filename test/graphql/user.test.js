const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers')

request.setBaseUrl('http://lojaebac.ebaconline.art.br/graphql')

let token;
beforeEach(async() => {
    token = await spec()
    .post('/')/// Faz a requisição no link acima
    .withGraphQLQuery(`
        mutation AuthUser($email: String, $password: String) {
        authUser(email: $email, password: $password) {
        success
        token
        }
        }
    `)
    .withGraphQLVariables({
        "email": "admin@admin.com",
        "password": "admin123"
      })
      .stores('data.authUser.token')
});

it('Listagem de Usuários', async () => { /// Teste de Consulta de usuário
    await spec()
    .post('/')
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
        query {
        Users {
            id
            email
            profile {
            firstName
            }
        }
        }
    `)
    .expectStatus(200)
    .expectJsonMatch({
        data: {
            Users: eachLike({   
                id: like("66ce588fa60ca1ef7fa0377d"),
                email: like("teste@teste.com"),
                profile: {
                    firstName: like("Olivia")
                }
            })
        }
      });
  
});