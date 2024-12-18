import { faker } from '@faker-js/faker';

/**
 * Descreve uma suíte de testes end-to-end para a aplicação front-end.
 * Esta suíte inclui testes para login de administrador, criação de produto e interações do usuário com o carrinho de compras.
 */
describe('E2E front testes', () => {

  let nome = faker.commerce.productName()
  let preco = faker.finance.amount({ dec: 0 })
  let descricao = faker.commerce.productDescription()
  let quantidade = faker.finance.amount({ max: 10, dec: 0 })

  /**
   * Testa o login do administrador.
   * Verifica se o administrador pode fazer login com sucesso e se a página de boas-vindas é exibida.
   */
  it('Login Admin', () => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="email"]').type(Cypress.env('useradmin'), { log: false })
    cy.get('[data-testid="senha"]').type(Cypress.env('passadmin'), { log: false })
    cy.get('[data-testid="entrar"]').click()

    cy.get('h1').contains('Bem Vindo').should('be.visible')
  })

  /**
   * Testa a criação de um novo produto pelo administrador.
   * Verifica se o administrador pode criar um novo produto com sucesso e se o produto é exibido após a criação.
   */
  it('Admin cria produto', () => {

    cy.loginFront(Cypress.env('useradmin'), Cypress.env('passadmin'))
    cy.get('h1').contains('Bem Vindo').should('be.visible')

    // Acessa pagina de cadastro de produtos
    cy.get('[data-testid="cadastrarProdutos"]').click()
    // preenche dados de cadastro e adiciona imagem
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="preco"]').type(preco)
    cy.get('[data-testid="descricao"]').type(descricao)
    cy.get('[data-testid="quantity"]').type(quantidade)
    cy.get('[data-testid="imagem"]').selectFile('cheese.png')

    cy.get('[data-testid="cadastarProdutos"]').click()
    // Verifica que produto foi criado com sucesso
    cy.get('.jumbotron').contains(nome).should('be.visible')
  })

  /**
   * Testa as interações do usuário com o carrinho de compras.
   * Verifica se o usuário pode adicionar produtos ao carrinho, aumentar e diminuir a quantidade, e limpar o carrinho.
   */
  it('Usuário adiciona produtos a lista de compras', () => {

    cy.loginFront(Cypress.env('user'), Cypress.env('pass'))
    cy.get('h1').contains('Serverest Store').should('be.visible')

    //Pesquisa produto e adiciona ao carrinho
    cy.pesquisaProduto('Metal Cheese')
    cy.get('[data-testid="adicionarNaLista"]').click()
    cy.get('[data-testid="shopping-cart-product-quantity"]').contains('1').should('be.visible')
    cy.get('[data-testid="product-increase-quantity"]').click()
    cy.get('[data-testid="shopping-cart-product-quantity"]').contains('2').should('be.visible')
    cy.get('[data-testid="product-decrease-quantity"]').click()
    //Pesquisa novo produto e adiciona ao carrinho
    cy.get('[data-testid="paginaInicial"]').click()
    cy.pesquisaProduto('bvqa')
    cy.get('[data-testid="adicionarNaLista"]').click()
    // Limpa lista
    cy.get('[data-testid="limparLista"]').click()
    cy.get('[data-testid="shopping-cart-empty-message"]').should('have.text', 'Seu carrinho está vazio')
  })

})

