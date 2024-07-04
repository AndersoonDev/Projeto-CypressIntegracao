/// <reference types='cypress' />

describe('Dinamic test', () => {
    beforeEach(() => {
       cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    it('Going back to the past', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','04/07/2024')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain','31/12/1969')

        const dt = new Date ( 2024, 11, 14, 19, 30, 33)

        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','14/12/2024')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain','17201')
        cy.get('#resultado > span').invoke('text').then((text) => {
            const number = Number(text);
            expect(number).gt(1720127560543);
        });

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then((text) => {
            const number = Number(text);
            expect(number).lte(0);
        });
        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then((text) => {
            const number = Number(text);
            expect(number).gte(1000);
        });
    })
});