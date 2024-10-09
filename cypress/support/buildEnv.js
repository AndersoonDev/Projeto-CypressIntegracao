const buildEnv = () => {

    cy.intercept({
        method: 'POST',
        url: '/signin'
    },
        {
            id: 100000,
            nome: 'Anderson Silva',
            token: '123456'

        }).as('signin')

    cy.intercept({
        method: 'GET',
        url: '/saldo'
    },
        [{
            conta_id: 999,
            conta: 'Carteira',
            saldo: '100,00',
        },
        {
            conta_id: 9909,
            conta: 'Banco',
            saldo: '1000000,00',
        }]
    ).as('saldo')

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
            }
        ]
    ).as('contas')

    cy.intercept({
        method: 'GET',
        url: '/extrato/**'
    },
        [{
            "conta": "Conta para movimentacoes",
            "id": 2082017,
            "descricao": "Movimentacao para exclusao",
            "envolvido": "AAA",
            "observacao": null,
            "tipo": "DESP",
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
            "conta": "Conta com movimentacao",
            "id": 2082018,
            "descricao": "Movimentacao de conta",
            "envolvido": "BBB",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-07-29T03:00:00.000Z",
            "data_pagamento": "2024-07-29T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 2218983,
            "usuario_id": 51737,
            "transferencia_id": null,
            "parcelamento_id": null
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
        {
            "conta": "Conta para saldo",
            "id": 2082020,
            "descricao": "Movimentacao 2, calculo saldo",
            "envolvido": "DDD",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-07-29T03:00:00.000Z",
            "data_pagamento": "2024-07-29T03:00:00.000Z",
            "valor": "-1000.00",
            "status": true,
            "conta_id": 2218984,
            "usuario_id": 51737,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 2082021,
            "descricao": "Movimentacao 3, calculo saldo",
            "envolvido": "EEE",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-07-29T03:00:00.000Z",
            "data_pagamento": "2024-07-29T03:00:00.000Z",
            "valor": "1534.00",
            "status": true,
            "conta_id": 2218984,
            "usuario_id": 51737,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para extrato",
            "id": 2082022,
            "descricao": "Movimentacao para extrato",
            "envolvido": "FFF",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-07-29T03:00:00.000Z",
            "data_pagamento": "2024-07-29T03:00:00.000Z",
            "valor": "-220.00",
            "status": true,
            "conta_id": 2218985,
            "usuario_id": 51737,
            "transferencia_id": null,
            "parcelamento_id": null
        }
        ])

}

export default buildEnv