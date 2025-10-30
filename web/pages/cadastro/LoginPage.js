
class LoginPage {
    constructor(page){
        this.page = page
        this.campoEmail = this.page.getByPlaceholder('Informe seu e-mail');
        this.campoSenha = this.page.getByPlaceholder('Informe sua senha');
        this.btnAcesaar = this.page.getByRole('button',{name:'Acessar'})
        this.btnRegistar = this.page.getByRole('button', { name: 'Registrar' });

    }

    

    async preencherCampoEmail () {
        await this.campoEmail.fill('teste@teste.com');
    }

    async preencherCampoSenha (){
        await this.campoSenha.fill("123456")
    }

    async clicarBotaoAcessar (){
        await this.btnAcesaar.click()
   }

   async clicarBotaoRegistra (){
    await this.btnRegistar.click()
   }

}
module.exports = { LoginPage };