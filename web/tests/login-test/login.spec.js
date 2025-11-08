import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { cadastrarComSaldo } from '../../helpers/cadastroHelper.js';
import { TelaPrincipalContaPage } from '../../pages/TelaPrincipalContaPage.js';
import '../../../hooks.js'
import { fakerPT_BR } from '@faker-js/faker'



test.describe('Login de usuário', () => {

    test('CT.LOG.01: Realizar login com sucesso', async ({ page }) => {
        const password = fakerPT_BR.internet.password()
        const nome = fakerPT_BR.person.fullName()
        const email = fakerPT_BR.internet.email()

        const loginPage = new LoginPage(page);
        const telaPrincipalContaPage = new TelaPrincipalContaPage(page);

        
       
        await cadastrarComSaldo(page, nome, email, password);
        await loginPage.preencherCampoEmail(email);
        await loginPage.preencherCampoSenha(password);
        await loginPage.clicarBotaoAcessar();

        // Verificar se o nome do cliente está visível na tela principal após o login
        await telaPrincipalContaPage.verificarNomeCliente(nome);

        // Verificar numero da conta está visível e formato correto
        await telaPrincipalContaPage.verificarNumeroContaValido();

        // Verificar se os botões de transação estão visíveis
        await telaPrincipalContaPage.verificarBotoesTransacoes();

        
    });

    test('CT.LOG.02: Realizar login com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();
        
        await loginPage.fazerLogin(email, password);
        
        // Verificar se a mensagem de erro de login está visível
        await expect(loginPage.obterMensagemErroLogin()).toBeVisible();
    });

    test('CT.LOG.03: Validar erro ao tentar login com campos em branco  ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.clicarBotaoAcessar();
        
        // Verificar se a mensagem de erro de login está visível
        await expect(loginPage.obterMensagemErroLogin()).toBeVisible();
    });

    test('CT.LOG.04: Validar mensagem campos obrigatórios', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clicarBotaoAcessar();
        
        // Verificar se a mensagem de erro de login está visível
        await expect(loginPage.obterMensagemCampoObrigatorio()).toHaveCount(2);
    });



});