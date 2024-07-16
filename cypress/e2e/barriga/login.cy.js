/// <reference types='cypress' />

import loc from '../../support/locators'

describe('Deve ter a nivel funcional', () => {
    beforeEach(() => {
        cy.login('anderson@teste.com.br', 'teste@teste')          
    });
    

    it('Deve inserir uma conta', () => {
        cy.resetApp()
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
    
     it('Deve ciar uma conta com o mesmo nome', () => {
      cy.get(loc.MENU.SETTINGS).click()
      cy.get(loc.MENU.CONTAS).click()
      cy.get(loc.CONTAS.NOME).type('Conta alterada')
      cy.get(loc.CONTAS.SALVAR).click()
      cy.get('.toast-error').should('contain', 'Erro: Error: Request failed with status code 400')

     });

     it('Deve inserir uma movimentação', () => {
        cy.get('[data-test="menu-movimentacao"]').click()
        cy.get('[data-test="descricao"]').type('Desc')
        cy.get('[data-test="valor"]').type('123')
        cy.get('[data-test="envolvido"]').type('Inter')
        cy.get('[data-test="status"]').click()
        cy.get('.btn-primary').click()
        cy.get('.toast-success').should('contain', 'Movimentação inserida com sucesso!')
        cy.get('.list-group > li').should('have.length', 7)
        cy.xpath('//div[@class="row"]//span[contains(., "Desc")]/..//small[contains(.,"123")]').should('exist')
        
     });
     
        it('Deve excluir uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath('//table//td[contains(.,"Conta alterada")]/..//i[@class="far fa-trash-alt"]').click()
        cy.get('.toast-message').should('contain', 'Conta excluída com sucesso!')
        
    });

})