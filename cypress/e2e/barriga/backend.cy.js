/// <reference types='cypress' />
const dayjs = require('dayjs')


describe('Deve ter a nivel funcional', () => {7
    // let token
    beforeEach(() => {
        cy.getToken('anderson@teste.com.br', 'teste@teste')
        // .then(tkn => {
        //     token = tkn
        // })
        cy.resetRest()
    });
    

    it('Deve inserir uma conta', () => {      
        cy.request({
            method: 'POST',
            url: '/contas',
            // headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            }        
        }).then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta via rest')
    })
});

it('Deve alterar uma conta', () => {
    cy.getContaByName('Conta para alterar')
    .then(contaId => {            
        cy.request({
            method: 'PUT',
            url: `/contas/${contaId}`,
            // headers: {Authorization: `JWT ${token}`},
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
        // headers: {Authorization: `JWT ${token}`},
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
            // headers: {Authorization: `JWT ${token}`},
            body:{
                conta_id: contaId,
                data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                data_transacao: dayjs().format('DD/MM/YYYY'),
                descricao: "movimentações via rest",
                envolvido: "inter",
                status: true,
                tipo: "REC",
                valor: "2000",
            }
        }).then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
        })
    })
 });

 it('Deve pegar o saldo da conta', () => {
     cy.request({
        method: 'GET',
        url: '/saldo',
        // headers: {Authorization: `JWT ${token}`}   
    }).then(response => {
        let saldoConta = null
        response.body.forEach(c => {
            if(c.conta === 'Conta para saldo') saldoConta = c.saldo
        });
        expect(saldoConta).to.be.equal('534.00')        
        // expect(response.body[2].conta).to.be.equal('Conta para saldo')
        // expect(response.body[2].saldo).contain(534)
    })
    cy.request({
        method: 'GET',
        url: '/transacoes',
        // headers: {Authorization: `JWT ${token}`},
        qs: {
           descricao: 'Movimentacao 1, calculo saldo'
        }
    }).then(response => {
        cy.request({
            method: 'PUT',
            url: `/transacoes/${response.body[0].id}`,
            // headers: {Authorization: `JWT ${token}`},
            body: {
                status: true,
                data_transacao: dayjs(response.body[0].data_transacao).format('DD/MM/YYYY'),
                data_pagamento: dayjs(response.body[0].data_pagamento).format('DD/MM/YYYY'),
                descricao: response.body[0].descricao,
                envolvido: response.body[0].envolvido,
                valor: response.body[0].valor,
                conta_id: response.body[0].conta_id,                
            },
        })
        
          cy.request({
            method: 'GET',
            url: '/saldo',
            // headers: {Authorization: `JWT ${token}`}   
        }).then(response => {
            let saldoConta = null
            response.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            });
            expect(saldoConta).to.be.equal('4034.00')        
         
        })
     });
        
    })
    
     it('Deve remover uma movimentação', () => {
         cy.request({
            method: 'get',
            url: `/transacoes`,
            // headers: {Authorization: `JWT ${token}`},
            qs: {
                descricao: 'Movimentacao para exclusao'
             }
        }).then(response => {
             cy.request({
                method: 'DELETE',
                url: `/transacoes/${response.body[0].id}`,
                // headers: {Authorization: `JWT ${token}`}
            })
        }).then(response => {
            expect(response.status).to.be.equal(204)
        })
     });
    

})

