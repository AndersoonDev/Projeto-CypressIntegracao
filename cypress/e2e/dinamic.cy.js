/// <reference types='cypress' />

describe('Dinamic test', () => {
   before(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
   });

   const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
   it('Cadastro com comida variada', () => {
        cy.get('#formNome').type('Anderson')
        cy.get('[data-cy="dataSobrenome"]').type('Santos')
        cy.get('#formSexoMasc').click()
        cy.get('#formComidaCarne').click()
        cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
        cy.get('[data-testid="dataEsportes"]').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            
    })
})