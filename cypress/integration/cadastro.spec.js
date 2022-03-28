
import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'


//var signupPage = new SignupPage(entregador)



describe('cadastro', function() {

   /* beforeEach(function () {
        cy.fixture('entregador').then((en) => {
            this.entregador = en
        })
    })*/

    it('usuario deve se tornar um entregador', function () {
       // chamando a variável da factory
        var entregador = signupFactory.entregador()

        signup.go()
        signup.fillForm(entregador)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('CPF incorreto', function () {

        var entregador = signupFactory.entregador()
        entregador.cpf = '286629238pi'
        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')


        //validar cpf inválido
        //cy.get('.alert-error').should('have.text','Oops! CPF inválido')
    })

    it('email incorreto', function () {
        var entregador = signupFactory.entregador()
        entregador.email = 'teste.br'
        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')


        //validar cpf inválido
        //cy.get('.alert-error').should('have.text','Oops! CPF inválido')
    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'cep', output: 'É necessário informar o CEP' },
            { field: 'endereço', output: 'É necessário informar o número do endereço' },
            { field: 'metodo_entrega', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },


        ]

        before(function(){
        signup.go()
        signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} ir required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })


    })

   
})