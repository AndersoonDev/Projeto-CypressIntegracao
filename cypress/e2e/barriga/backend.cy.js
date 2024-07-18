/// <reference types='cypress' />


describe('Deve ter a nivel funcional', () => {
    beforeEach(() => {
        // cy.login('anderson@teste.com.br', 'teste@teste')        
    });
    

    it('Deve inserir uma conta', () => {
       cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: 'anderson@teste.com.br',
            redirecionar: true,
            senha: 'teste@teste'
        }
       });
    });

    it('Deve alterar uma conta', () => {
        
    });
    
     it('Deve criar uma conta com o mesmo nome', () => {
      
     });

     it('Deve inserir uma movimentação', () => {
        
     });

     it('Deve pegar o saldo da conta', () => {
      
     });

     it('Deve remover uma movimentação', () => {
        
     });
     
    it('Deve excluir uma conta', () => {
        
    });

})