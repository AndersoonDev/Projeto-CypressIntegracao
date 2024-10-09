/// <reference types='cypress' />
const dayjs = require('dayjs')


describe('Deve ter a nivel funcional', () => {
    beforeEach(() => {
        cy.getToken('anderson@teste.com.br', 'teste@teste')
        cy.resetRest()
    });


    it('Deve inserir uma conta', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
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
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            })
    });

    it('Deve exibir um erro ao criar uma conta com o mesmo nome', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
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
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
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
        }).then(response => {
            let saldoConta = null
            response.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            });
            expect(saldoConta).to.be.equal('534.00')
        })
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(response => {
            cy.request({
                method: 'PUT',
                url: `/transacoes/${response.body[0].id}`,
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
            }).then(response => {
                let saldoConta = null
                response.body.forEach(c => {
                    if (c.conta === 'Conta para saldo') saldoConta = c.saldo
                });
                expect(saldoConta).to.be.equal('4034.00')

            })
        });

    })

    it('Deve remover uma movimentação', () => {
        cy.request({
            method: 'get',
            url: `/transacoes`,
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(response => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${response.body[0].id}`,
            })
        }).then(response => {
            expect(response.status).to.be.equal(204)
        })
    });


})

