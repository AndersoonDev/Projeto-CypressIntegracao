/// <reference types='cypress' />

describe('Helpers...', () => {
    beforeEach(() => {
       cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    it('Wrap...', () => {
    //    const obj = {nome: 'User', idade: 20}
    //    expect(obj).to.have.property('nome')
    cy.get('#formNome').then($el => {
        cy.wrap($el).type('funciona?')
    
        });
    });

    it('Its', () => {
       const obj = {nome: 'User', idade: 20}
       cy.wrap(obj).should('have.a.property', 'nome', 'User')
       cy.wrap(obj).its('nome').should('be.equal', 'User')

       const obj2 = {nome: 'User', idade: 20, endereço: {rua: 'dos bobos'}}
       cy.wrap(obj2).its('endereço').its('rua').should('contain', 'bobos')
       cy.wrap(obj2).its('endereço.rua').should('contain', 'bobos')
       cy.title().its('length').should('be.equal', 20)

    });

    it.only('Invoke', () => {
       const getValue = () => 1
       const soma = (a, b) => a + b;

       cy.wrap({fn: soma}).invoke('fn', 2 , 5).should('be.equal',7)
       cy.get('#formNome').invoke('val', 'Funciona 1')

       cy.window().invoke('alert', 'Da pra ver?')
       cy.get('#resultado').invoke('html', '<input type="button" value="hacked"/>')
    });
});