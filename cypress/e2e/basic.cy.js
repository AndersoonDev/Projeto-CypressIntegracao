/// <reference types='cypress' />

describe('Cypress Basics', () => {
    it.only('Should visit page and assert title', () => {

       cy.visit('https://wcaquino.me/cypress/componentes.html');

       //cy.pause();

       cy.title().should('be.equal', 'Campo de Treinamento') //.debug()
       cy.title().should('contain', 'Campo de Treinamento')
       cy.title().should('be.equal', 'Campo de Treinamento').should('contain', 'Campo')       
       cy.title().should('be.equal', 'Campo de Treinamento').and('contain', 'Campo')

    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')

    });
});