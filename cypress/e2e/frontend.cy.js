/// <reference types='cypress' />

import loc from '../../support/locators'
import buildEnv from '../../support/buildEnv';

describe('Deve ter a nivel funcional', () => {
    after(() => {
        cy.clearLocalStorage()
    });
    beforeEach(() => {
        buildEnv()
        cy.login('anderson@teste.com.br', 'teste')
    });

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
    });

    it('Deve testar a responsividade', () => {
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
        cy.viewport(500, 700)
        cy.get(loc.MENU.HOME).should('exist').and('be.not.visible')
        cy.viewport('iphone-5')
        cy.get(loc.MENU.HOME).should('exist').and('be.not.visible')
        cy.viewport('ipad-2')
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
    });

    it('Deve inserir uma conta', () => {

        cy.intercept({
            method: 'POST',
            url: '/contas'
        },

            {
                "id": 3,
                "nome": "Conta de Teste",
                "visivel": true,
                "usuario_id": 1
            }

        ).as('saveContas')

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
            [
                {
                    "id": 1,
                    "nome": "Carteira",
                    "visivel": true,
                    "usuario_id": 1
                },
                {
                    "id": 2,
                    "nome": "Banco",
                    "visivel": true,
                    "usuario_id": 1
                },
                {
                    "id": 3,
                    "nome": "Conta de Teste",
                    "visivel": true,
                    "usuario_id": 1
                }
            ]
        ).as('contasSave')

        cy.get(loc.CONTAS.NOME).type('Conta de teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.CONTAS.MSG_SUCESSO).should('contain', 'Conta inserida com sucesso!')
    });

    it('Deve alterar uma conta', () => {

        cy.intercept({
            method: 'PUT',
            url: '/contas/**'
        },
            [
                {
                    "id": 1,
                    "nome": "Conta alterada",
                    "visivel": true,
                    "usuario_id": 1
                }
            ]
        ).as('contas')

        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    });

    it('Deve criar uma conta com o mesmo nome', () => {

        cy.intercept({
            method: 'POST',
            url: '/contas'
        },

            {
                "error": "Já existe uma conta com esse nome!",
                statusCode: 400
            }


        ).as('saveContaMesmoNome')

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')

    });

    it('Deve inserir uma movimentação', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        },

            {
                "id": 2082024,
                "descricao": "Desc",
                "envolvido": "inter",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "123.00",
                "status": false,
                "conta_id": 2218982,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            }

        )


        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        },
            { 'fixture': 'movimentacaoSalva' }
        )
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MOVIMENTACAO.MSG_SUCESSO).should('contain', 'Movimentação inserida com sucesso!')
        cy.get(loc.MOVIMENTACAO.LISTA).should('have.length', 6)

    });

    it('Deve pegar o saldo da conta', () => {

        cy.intercept({
            method: 'GET',
            url: '/transacoes/**'
        },

            {
                "conta": "Conta para saldo",
                "id": 2082019,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 2218984,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            },
        )

        cy.intercept({
            method: 'PUT',
            url: '/transacoes/**'
        },

            {
                "conta": "Conta para saldo",
                "id": 2082019,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 2218984,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            },
        )

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EDITAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MOVIMENTACAO.MSG_SUCESSO).should('contain', 'Movimentação alterada com sucesso!')

        cy.intercept({
            method: 'GET',
            url: '/saldo'
        },
            [{
                conta_id: 999,
                conta: 'Carteira',
                saldo: '4034,00',
            },
            {
                conta_id: 9909,
                conta: 'Banco',
                saldo: '1000000,00',
            }]
        ).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CARTEIRA('Carteira', '4.034,00')).should('exist')
    });

    it('Deve remover uma movimentação', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/transacoes/**'
        },
            {
                statusCode: 204
            })
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.EXTRATO.MSG_SUCESSO).should('contain', 'Movimentação removida com sucesso!')
    });

    it('Deve excluir uma conta', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/contas/**'
        },
            {
                statusCode: 204
            })

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_EXCLUIR('Carteira')).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta excluída com sucesso!')

    });

    it('Deve testar as cores', () => {
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        },
            [{
                "conta": "Conta para movimentacoes",
                "id": 2082017,
                "descricao": "Receita paga",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 2218982,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Receita pendente",
                "id": 2082018,
                "descricao": "Movimentacao de conta",
                "envolvido": "BBB",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "-1500.00",
                "status": false,
                "conta_id": 2218983,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Despesa paga",
                "id": 2082019,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": true,
                "conta_id": 2218984,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Despesa pendente",
                "id": 2082020,
                "descricao": "Movimentacao 2, calculo saldo",
                "envolvido": "DDD",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-07-29T03:00:00.000Z",
                "data_pagamento": "2024-07-29T03:00:00.000Z",
                "valor": "-1000.00",
                "status": false,
                "conta_id": 2218984,
                "usuario_id": 51737,
                "transferencia_id": null,
                "parcelamento_id": null
            }]
        )
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receitapaga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receitapendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesapaga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesapendente')).should('have.class', 'despesaPendente')
    });
})