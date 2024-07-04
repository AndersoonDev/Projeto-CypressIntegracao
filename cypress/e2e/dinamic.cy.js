/// <reference types='cypress' />

describe('Dinamic test', () => {
   beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
   });

   const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
   foods.forEach(food => {
    it(`Cadastro com comida variada: ${food}`, () => {
        cy.get('#formNome').type('Anderson')
        cy.get('[data-cy="dataSobrenome"]').type('Santos')
        cy.get('#formSexoMasc').click()
        cy.xpath(`//label[contains(., '${food}')]`).click()
        cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
        cy.get('[data-testid="dataEsportes"]').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
               
       })      
   });

    it.only('Deve selecionar todos usando o Each', () => {
        cy.get('#formNome').type('Anderson')
        cy.get('[data-cy="dataSobrenome"]').type('Santos')
        cy.get('#formSexoMasc').click()
        cy.get('[name=formComidaFavorita]').each($el => {
            if($el.val() === 'Vegetariano'){
            cy.wrap($el).click()
            }
        })
        cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
        cy.get('[data-testid="dataEsportes"]').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
   });
})