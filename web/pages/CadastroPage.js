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
        this.toggleVisualContainer = this.page.locator('label:has(#toggleAddBalance)');
        this.mensagemSucessoModal = this.page.getByText(/A conta .* foi criada com sucesso/);
        this.errocampoObrigatorio = this.page.getByText('É campo obrigatório');
        this.erroCampoEmail = this.page.getByText('Email não pode ser vazio');
        this.erroCampoSenha = this.page.getByText('Campo Senha não pode ser vazio');
        this.erroCampoNome = this.page.getByText('Nome não pode ser vazio.');
        this.erroConfirmacaoSenha = this.campoConfirmacaoSenha.locator('Confirmar senha não pode ser vazio');
        this.erroSenhaNaoCoincide = this.page.getByText('As senhas não são iguais');
        this.btnFechar = this.page.locator('#btnCloseModal');
        
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
async fecharModalSucesso() {
  await this.btnFechar.click();

    }

    async realizarCadastroComSaldo(nome, email, password) {
        await this.preencherCampoNome(nome);
        await this.preencherCampoEmail(email);
        await this.preencherCampoSenha(password);
        await this.preencherConfirmacaoSenha(password);
        await this.ativarContaComSaldo();
        await this.clicarBotaoCadastrar();
        await this.fecharModalSucesso();
    }
    async realizarCadastroSemSaldo(nome, email, password) {
        
        await this.preencherCampoNome(nome);
        await this.preencherCampoEmail(email);
        await this.preencherCampoSenha(password);
        await this.preencherConfirmacaoSenha(password);
        await this.clicarBotaoCadastrar();
        await this.fecharModalSucesso();
    }

}
module.exports = { CadastroPage };