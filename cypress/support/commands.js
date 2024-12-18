Cypress.Commands.add('cadastroUsuario', (nome, email, password, administrador) => {
    cy.api("POST", "/usuarios", {
        nome,
        email,
        password,
        administrador
    })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
            return response.body._id
        })
})

Cypress.Commands.add('loginUsuario', (email, password) => {
    cy.api("POST", "/login", {
        email,
        password
    })
        .then((response) => {
            Cypress.env('token', response.body.authorization);
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Login realizado com sucesso')
            return response;
        })
})

Cypress.Commands.add('buscaUsuario', (id) => {
    cy.api({
        method: 'GET',
        url: '/usuarios/' + id,
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('cadastraCarrinho', (authToken) => {
    cy.api({
        method: 'POST',
        url: '/carrinhos',
        headers: {
            authorization: 'bearer ' + authToken,
        },
        body: {
            "produtos": [
                {
                    "idProduto": "BeeJh5lz3k6kSIzA",
                    "quantidade": 1
                },
                {
                    "idProduto": "YaeJ455lz3k6kSIzA",
                    "quantidade": 3
                }
            ]
        },
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('loginFront', (username, password) => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="email"]').type(username)
    cy.get('[data-testid="senha"]').type(password, { log: false })
    cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('pesquisaProduto', (nomeProduto) => {
    cy.get('[data-testid="pesquisar"]').type(nomeProduto)
    cy.get('[data-testid="botaoPesquisar"]').click()
})