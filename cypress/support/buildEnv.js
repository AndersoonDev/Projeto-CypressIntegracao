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

}

export default buildEnv