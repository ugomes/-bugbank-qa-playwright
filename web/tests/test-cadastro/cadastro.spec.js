import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/cadastro/LoginPage.js';
import { CadastroPage } from '../../pages/cadastro/cadastroPage.js';
import '../../../hooks.js'
import { fakerPT_BR } from '@faker-js/faker'

const password = fakerPT_BR.internet.password()
const nome = fakerPT_BR.person.fullName()
const email = fakerPT_BR.internet.email()

test.describe('Cadastro de usuário', () => {

    test('CT.CAD.01: Realizar cadastro com sucesso com saldo inicial', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);
        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha(password);
        await cadastroPage.ativarContaComSaldo();
        await cadastroPage.clicarBotaoCadastrar();

        // Verifica se o switch está rosa
        await expect(cadastroPage.toggleVisualContainer).toHaveCSS('background-color', 'rgb(214, 42, 146)');
        // Verifica se a mensagem de sucesso foi exibida
        await expect(cadastroPage.mensagemSucessoModal).toBeVisible();

        
    });
    test('CT.CAD.02: Realizar cadastro com sucesso sem saldo inicial', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha(password);
        await cadastroPage.clicarBotaoCadastrar();

        // Verifica se o switch está acinzentado
        await expect(cadastroPage.toggleVisualContainer).toHaveCSS('background-color', 'rgb(211, 211, 211)');
        // Verifica se a mensagem de sucesso foi exibida
        await expect(cadastroPage.mensagemSucessoModal).toBeVisible();


        
    });

    test('CT.CAD.03: Validar mensagens de erro para campos obrigatórios', async ({ page }) => {
       
        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.clicarBotaoCadastrar();

        // Verifica as mensagens de erro para os campos obrigatórios
        await expect(cadastroPage.erroCampoEmail).toHaveText('É campo obrigatório');
        await expect(cadastroPage.erroCampoSenha).toHaveText('É campo obrigatório');
        await expect(cadastroPage.erroConfirmacaoSenha).toHaveText('É campo obrigatório');
        
    });
    test('CT.CAD.04: Validar erro ao cadastrar com senhas que não coincidem', async ({ page }) => {
       
        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);
        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha('senhaDiferente123');
        await cadastroPage.clicarBotaoCadastrar();

        // Verifica se a mensagem de erro foi exibida
        await expect(cadastroPage.erroSenhaNaoCoincide).toBeVisible();
    });

});
