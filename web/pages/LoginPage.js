
class LoginPage {
    constructor(page){
        this.page = page
        const loginForm = this.page.locator('form').filter({ hasText: 'Acessar' });
        this.campoEmail = loginForm.getByPlaceholder('Informe seu e-mail');
        this.campoSenha = loginForm.getByPlaceholder('Informe sua senha');
        this.btnAcesaar = loginForm.getByRole('button', { name: 'Acessar' });
        this.btnRegistar = this.page.getByRole('button', { name: 'Registrar' });
        this.mensagemErroLogin = this.page.locator('#modalText');
        this.mensagemCampoObrigatorio = loginForm.locator('.input__warging');
    }

    async preencherCampoEmail(email) {
        await this.campoEmail.fill(email);
    }

    async preencherCampoSenha(senha) {
        await this.campoSenha.fill(senha);
    }

    async clicarBotaoAcessar() {
        await this.btnAcesaar.click();
    }

    async clicarBotaoRegistrar() {
        await this.btnRegistar.click();
    }

    obterMensagemErroLogin() {
        return this.mensagemErroLogin;
    }

    obterMensagemCampoObrigatorio() {
        return this.mensagemCampoObrigatorio;
    }


    async fazerLogin(email, password) {
        await this.campoEmail.fill(email);
        await this.campoSenha.fill(password);
        await this.btnAcesaar.click();
    }
}

module.exports = { LoginPage };
