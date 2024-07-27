/// <reference types='cypress' />

describe('Work with basic elements', () => {
   beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
   });

   it('basic', () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input').click()
   });

   it.only('Using Xpath', () => {
        cy.xpath('//input')
    });
})