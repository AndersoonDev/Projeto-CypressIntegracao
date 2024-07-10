// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('clickAlert', (locator, message) => {
        cy.get(locator).click() 
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(message)        
    })
  });

Cypress.Commands.add('login', (email, senha) => {
        cy.get('[data-test="email"]').type('anderson@teste.com.br')
        cy.get('[data-test="passwd"]').type('teste@teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo, Anderson Silva!')
  });