/// <reference types='cypress' />

describe('Work with alerts', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    it('Alert', () => {
        cy.get('#alert').click() 
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta') // para dar o nome um evento ou operaçao
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })                  
    })
    
    it('Confirm', () => {
        cy.on('window:alert', msg => { 
            expect(msg).to.be.equal('Confirmado')
        })
        cy.on('window:confirm', msg => { 
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.get('#confirm').click()
    })

    it('Deny', () => {
        cy.on('window:confirm', msg => { 
            expect(msg).to.be.equal('Confirm Simples')
            return false // serve para clicar no botão cancelar do alert
        })
        cy.on('window:alert', msg => { 
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it('Prompt', () => {
        cy.window().then(win =>{
            cy.stub(win, 'prompt').returns('42') 
        })
        cy.on('window:confirm', msg => { 
            expect(msg).to.be.equal('Era 42?')
        })
        cy.on('window:alert', msg => { 
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()        
    })

    it.only('Validando Mensagens', () => {
        const stub = cy.stub().as('alerta')

        cy.get('#formCadastrar').click()
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(()=> expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        
        cy.get('#formNome').type('Anderson')
        cy.get('#formCadastrar').click()
        .then(()=> expect(stub.getCall(0)).to.be.calledWith('Sobrenome eh obrigatorio'))
        
        cy.get('[data-cy="dataSobrenome"]').type('Silva')
        cy.get('#formCadastrar').click()
            .then(()=> expect(stub.getCall(0)).to.be.calledWith('Sexo eh obrigatorio'))
        
    })
});