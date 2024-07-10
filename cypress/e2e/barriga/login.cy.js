/// <reference types='cypress' />

describe('Deve ter a nivel funcional', () => {
   beforeEach(() => {
      cy.visit('https://barrigareact.wcaquino.me/')
      cy.get('[data-test="email"]').type('anderson@teste.com.br')
      cy.get('[data-test="passwd"]').type('teste@teste')
      cy.get('.btn').click()
      cy.get('.toast-message').should('contain', 'Bem vindo, Anderson Silva!')
      
   });

   it('Deve inserir uma conta', () => {
      cy.get('[data-test="menu-settings"] > .fas').click()
      cy.get('[href="/contas"]').click()
      cy.get('[data-test="nome"]').type('Conta de teste')
      cy.get('.btn').click()
      cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso!')
   });

   it('Deve Alterar uma conta', () => {
      cy.get('[data-test="menu-settings"] > .fas').click()
      cy.get('[href="/contas"]').click()
      cy.xpath("//i[@title='Alterar id: 2184522']").click()
      cy.get('[data-test="nome"]').clear().type('Conta de alterada')
      cy.get('.btn > .far').click()
      cy.get('.toast-message').should('contain', 'Conta atualizado com sucesso!')
      
   });
})