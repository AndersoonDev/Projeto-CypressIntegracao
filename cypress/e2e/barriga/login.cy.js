/// <reference types='cypress' />

import loc from '../../support/locators'

describe('Deve ter a nivel funcional', () => {
    beforeEach(() => {
        cy.login('anderson@teste.com.br', 'teste@teste')          
    });
    

    it('Deve inserir uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta de teste')
        cy.get(loc.CONTAS.SALVAR).click()
        cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso!')
    });

    it('Deve alterar uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath('//table//td[contains(., "Conta de teste")]/..//i[@class="far fa-edit"]').click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.SALVAR).click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    });

    it('Deve excluir uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath('//table//td[contains(., "Conta alterada")]/..//i[@class="far fa-trash-alt"]').click()
        cy.get('.toast-message').should('contain', 'Conta excluída com sucesso!')
    });
})