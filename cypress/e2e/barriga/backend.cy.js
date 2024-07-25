/// <reference types='cypress' />


describe('Deve ter a nivel funcional', () => {7
    let token
    beforeEach(() => {
        cy.getToken('anderson@teste.com.br', 'teste@teste')
        .then(tkn => {
            token = tkn
        })
        cy.resetRest()
    });
    

    it('Deve inserir uma conta', () => {      
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            }        
        }).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
    })
});

it('Deve alterar uma conta', () => {
    cy.request({
        method: 'GET',
        url: '/contas',
        headers: {Authorization: `JWT ${token}`},
        qs: {
            nome: 'Conta para alterar'
        },
    }).then(response => {            
        cy.request({
            method: 'PUT',
            url: `/contas/${response.body[0].id}`,
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta alterada via rest'
            }
            }).then((response) => {
                expect(response.status).to.eq(200);
        });
    })
});
    
 it('Deve criar uma conta com o mesmo nome', () => {
    cy.request({
        method: 'POST',
        url: '/contas',
        headers: {Authorization: `JWT ${token}`},
        failOnStatusCode: false,
        body: {
            nome: 'Conta mesmo nome'
        }        
    }).then(response => {
        expect(response.status).to.be.equal(400)
        expect(response.body.error).to.be.equal('Já existe uma conta com esse nome!')
})
 });

 it('Deve inserir uma movimentação', () => {
    cy.getContaByName('Conta para movimentacoes')
    .then(contaId =>{        
        cy.request({
            method: 'POST',
            url: '/transacoes',
            headers: {Authorization: `JWT ${token}`},
            body:{
                conta_id: contaId,
                data_pagamento: dayjs().format('MMM DD, YYYY'),
                data_transacao: dayjs().format('MMM DD, YYYY'),
                descricao: "movimentações via rest",
                envolvido: "inter",
                status: true,
                tipo: "REC",
                valor: "2000",
            }
        })
    })
 });

//  it('Deve pegar o saldo da conta', () => {
    
//  });

//  it('Deve remover uma movimentação', () => {
    
//  });
    
// it('Deve excluir uma conta', () => {
    
// });

})