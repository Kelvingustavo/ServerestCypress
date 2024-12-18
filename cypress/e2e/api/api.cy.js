import { faker } from '@faker-js/faker';

/**
 * Esta suíte de testes contém testes de API para uma aplicação de gerenciamento de usuários.
 */
describe("API Testes", () => {

    /**
     * Este caso de teste realiza uma requisição POST para fazer login na aplicação.
     * Verifica o status da resposta e a mensagem.
     */
    it("POST login na aplicação", () => {
        cy.api("POST", "/login", {
            email: Cypress.env('useradmin'),
            password: Cypress.env('passadmin')
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('message', 'Login realizado com sucesso')
            })
    })

    /**
     * Este caso de teste realiza uma requisição POST para cadastrar um novo usuário.
     * Gera dados aleatórios do usuário e verifica o processo de login.
     */
    it("POST cadastrar usuário", () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        let password = faker.internet.password(8)

        cy.cadastroUsuario(nome, email, password, 'false')
            .then(($login) => {
                cy.loginUsuario(email, password)
            })
    })

    /**
     * Este caso de teste realiza uma requisição GET para buscar um usuário pelo seu ID.
     * Verifica o status da resposta.
     */
    it("GET buscar usuário", () => {
        let id = '0uxuPY0cbmQhpEz1'

        cy.api({
            method: 'GET',
            url: '/usuarios/' + id,
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

})


