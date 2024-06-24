/// <reference types='cypress' />

describe('Work with basic elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

    });
    
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        //cy.get('body').should('have.text', 'Cuidado') nao funciona
        cy.get('span').should('contain', 'Cuidado')
        //cy.get('div').should('contain', 'Cuidado') nao funciona
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it('Links', () => {

        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    });

    it.only('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test') //have.value para verificar o valor do input
        cy.get('#elementosForm\\:sugestoes').type('Cypress Test')
        // cy.get('#elementosForm\\:sugestoes').should('have.value', 'Cypress Test')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('???')
        cy.get('[data-cy="dataSobrenome"]').type('Teste12345{backspace}{backspace}').should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes').clear().type('Error{selectall}acerto', {delay: 100})
        cy.get('#elementosForm\\:sugestoes').should('have.value', 'acerto')
    });
});