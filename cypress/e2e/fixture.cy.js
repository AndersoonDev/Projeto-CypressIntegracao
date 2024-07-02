/// <reference types='cypress' />


describe('Fixture tests', () => {
    beforeEach(() => {
       cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    it('Get data form fixture file ', () => {
        cy.fixture('userData').then((usuario) =>{

            cy.get('#formNome').type(usuario.nome)
            cy.get('[data-cy="dataSobrenome"]').type(usuario.sobrenome)
            cy.get('#formSexoMasc').click()
            cy.get('#formComidaCarne').click()
            cy.get('[data-test="dataEscolaridade"]').select(usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })            
    })
    
})