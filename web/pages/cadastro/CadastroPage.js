class CadastroPage {
    constructor(page){
        this.page = page

        // Localiza o formulário de cadastro para evitar ambiguidade com o formulário de login
        const registrationForm = this.page.locator('form').filter({ hasText: 'Voltar ao login' });
        this.campoEmail = registrationForm.getByPlaceholder('Informe seu e-mail');
        this.campoNome = registrationForm.getByPlaceholder('Informe seu nome');
        this.campoSenha = registrationForm.getByPlaceholder('Informe sua senha');
        this.campoConfirmacaoSenha = registrationForm.getByPlaceholder('Informe a confirmação da senha');
        this.btnCadastrar = registrationForm.getByRole('button', { name: 'Cadastrar' });
        this.toggleContaComSaldo = this.page.locator('#toggleAddBalance');
        this.toggleVisualContainer = page.locator('label:has(#toggleAddBalance)');
        this.mensagemSucessoModal = this.page.getByText(/A conta .* foi criada com sucesso/);
        this.erroCampoEmail = this.campoEmail.locator('+ p');
        this.erroCampoSenha = this.campoSenha.locator('+ p');
        this.erroConfirmacaoSenha = this.campoConfirmacaoSenha.locator('+ p');
        this.erroSenhaNaoCoincide = this.page.getByText('As senhas não são iguais');
    }
    async preencherCampoNome (nome) {
        await this.campoNome.fill(nome);
    }
    async preencherCampoEmail (email) {
        await this.campoEmail.fill(email);
    }
    async preencherCampoSenha (password) {
        await this.campoSenha.fill(password);
    }
    async preencherConfirmacaoSenha (password) {
        await this.campoConfirmacaoSenha.fill(password);
    }
    async clicarBotaoCadastrar() {
        await this.btnCadastrar.click();
    }

    
async ativarContaComSaldo() {
  await this.toggleContaComSaldo.click();
 
}


async desativarContaComSaldo() {
  await this.toggleContaComSaldo.uncheck();
  
}



}
module.exports = { CadastroPage };