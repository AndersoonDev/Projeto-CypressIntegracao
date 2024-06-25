/// <reference types='cypress' />

describe('Esperas...', () => {

    beforeEach(() => {
       cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funciona')
    });

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist').type('Funciona')
    });

    it('Uso do find', () => {
        // cy.get('#buttonList').click()
        // cy.get('#lista > :nth-child(1) > span').should('contain', 'Item 1')
        // cy.get('#lista > :nth-child(2) > span').should('contain', 'Item 2')
        // cy.get('#lista li').find('span').should('contain', 'Item 1')
        // cy.get('#lista li span').should('contain', 'Item 2')
        cy.get('#buttonListDOM').click()
        cy.get('#lista li').find('span').should('contain', 'Item 1')
        cy.get('#lista li').find('span').should('contain', 'Item 2')

    });

    it('Uso do Timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout: 1000}).should('exist')

        cy.get('#buttonListDOM').click()
        // cy.wait(5000) //não usar wait e sim o timeout
        cy.get('#lista li span', {timeout: 7000}).should('have.length', 1).should('have.length', 2)
        cy.get('#lista li span', {timeout: 7000}).should('have.length', 1)
        cy.get('#lista li span', {timeout: 7000}).should('have.length', 2)
    });

    it('Click retry', () => {
        cy.get('#buttonCount').click().click().should('have.value', '111')
    });

    it.only('Deve imprimir o titulo no campo de nome e sobrenome', () => {

        cy.title().should('be.equal', 'Campo de Treinamento') //.debug()
        cy.title().should('contain', 'Campo')
        // cy.title().should('be.equal', 'Campo de Treinamento').should('contain', 'Campo')       
        cy.title().should('be.equal', 'Campo de Treinamento').and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })
        cy.get('[data-cy="dataSobrenome"]').then($el =>{
            $el.val(syncTitle)
        })
        cy.get('#elementosForm\\:sugestoes').then($el=> {
            // $el.val(syncTitle)
            cy.wrap($el).type(syncTitle)

        })
    });

    it('Should vs Then', () => {

        // cy.get('#buttonListDOM').click()
        cy.get('#buttonListDOM').then($el => {
            // console.log($el)
            expect($el).to.have.length(1)
            }).and('have.id', 'buttonListDOM')
    });
}); 