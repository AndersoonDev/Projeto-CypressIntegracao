/// <reference types='cypress' />

describe('Work with Iframes', () => {
 beforeEach(() => {
cy.visit('https://wcaquino.me/cypress/componentes.html');
});
it('Deve preencher campo de texto', () => {
    cy.get('#frame1').then(iframe => {
        const body = iframe.contents().find('body')
        cy.wrap(body).find('#tfield').type('Funciona?').should('have.value', 'Funciona?')
    })
  })

it.only('Deve preencher campo de texto', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html');
    cy.get('#otherButton').click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Click OK!')
    })
    })
  })
