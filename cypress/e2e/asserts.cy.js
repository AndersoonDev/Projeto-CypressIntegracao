/// <reference types='cypress' />

it('Equality', () => {
	const a = 1

	expect(a).equal(1)
	expect(a).to.be.equal(1)
	// expect("a").not.to.be.eqal('b')
});

it('Truthy', () => {
	const a = true
	const b = null
	let c

	expect(a).to.be.true
	expect(true).to.be.true
	expect(b).to.be.null
	expect(a).to.be.not.null
	expect(c).to.be.undefined

});

it('Object Equality', () => {
   const obj = {
	a: 1,
	b: 2
   }

   expect(obj).equal(obj)
   expect(obj).equals(obj)
   expect(obj).eq(obj)
   expect(obj).to.be.equal(obj)
   expect(obj).to.be.deep.equal({a:1, b:2})
   expect(obj).eql({a:1, b:2})
   expect(obj).include({a:1})
   expect(obj).to.have.property('b')
   expect(obj).to.not.be.empty
   expect({}).to.be.empty
});

it('Arrays', () => {
   const arr = [1, 2, 3]

   expect(arr).to.have.members([1, 2, 3])
   expect(arr).to.include.members([1, 3])
   expect(arr).to.not.be.empty //para saber se o array esta vazio ou não
   expect([]).to.be.empty //espero que um array vazio esteja vazio

});

it('Types', () => {
   const num = 1
   const str = 'string'

   expect(num).to.be.a('number')
   expect(str).to.be.a('string')
   expect({}).to.be.an('object')
   expect([]).to.be.an('array')
});

it('String', () => {
   const str = 'String de teste'

   expect(str).to.be.equal('String de teste')
   expect(str).to.have.length(15) //para verificar o tamanho da string
   expect(str).to.contains('teste') //para saber se a string contem o que eu quero
   expect(str).to.match(/de/) //para saber se a string contem o que eu quero
   expect(str).to.match(/^String/) //para saber se a string começa o que eu quero
   expect(str).to.match(/teste$/) //para saber se a string termina o que eu quero
   expect(str).to.match(/.{15}/) //para verificar o tamanho da string
   expect(str).to.match(/\w+/) //para verificar que existe apenas letras
   expect(str).to.match(/\D+/) //para verificar que não contem numeros
   
}); 

it('Numbers', () => {
   const number = 4
   const floatNumber = 5.2123
   
   expect(number).to.be.equal(4)
   expect(number).to.be.above(3) //acima de
   expect(number).to.be.below(7) //abaixo de
   expect(floatNumber).to.be.equal(5.2123)
   expect(floatNumber).to.be.closeTo(5.2 , 0.1) //para verificar se o floatNumber esta proximo de 5.2
   expect(floatNumber).to.be.above(5) //floatNumber acima de

});