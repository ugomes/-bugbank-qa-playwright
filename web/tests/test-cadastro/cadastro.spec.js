
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { CadastroPage } from '../../pages/CadastroPage.js';
import { TelaPrincipalContaPage } from '../../pages/TelaPrincipalContaPage.js';
import { cadastrarComSaldo, cadastrarSemSaldo } from '../../helpers/cadastroHelper.js';
import { fazerLoginComCredenciais } from '../../helpers/loginHelper.js';
import '../../../hooks.js';
import { fakerPT_BR } from '@faker-js/faker';

test.describe('Cadastro de Conta', () => {

    test('CT.CAD.01: Realizar cadastro com sucesso com saldo inicial', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const cadastroPage = new CadastroPage(page);
        const telaPrincipalContaPage = new TelaPrincipalContaPage(page);

        await cadastrarComSaldo(page, nome, email, password);
        
        await expect(cadastroPage.mensagemSucessoModal).toBeVisible();
    });

    test('CT.CAD.02: Realizar cadastro com sucesso sem saldo inicial', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const cadastroPage = new CadastroPage(page);

        await cadastrarSemSaldo(page, nome, email, password);

        await expect(cadastroPage.mensagemSucessoModal).toBeVisible();
    });

    test('CT.CAD.03: Validar mensagens de erro para campos obrigatórios', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.campoObrigatorioNome).toCount(4);
    });

    test('CT.CAD.04: Validar erro ao cadastrar com senhas que não coincidem', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();
        const passwordDiferente = fakerPT_BR.internet.password();

        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha(passwordDiferente);
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.erroSenhaNaoCoincide).toBeVisible();
    });

    test('CT.CAD.05: Validar erro ao tentar cadastrar com nome em branco', async ({ page }) => {
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha(password);
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.erroCampoNome).toBeVisible();
    });

    test('CT.CAD.06: Validar erro ao tentar cadastrar com email em branco', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const password = fakerPT_BR.internet.password();

        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.preencherConfirmacaoSenha(password);
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.erroCampoEmail).toBeVisible();
    });

    test('CT.CAD.07: Validar erro ao tentar cadastrar com senha em branco', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();

        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.erroCampoSenha).toBeVisible();
    });

    test('CT.CAD.08: Validar erro ao tentar cadastrar com confirmação de senha em branco', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const loginPage = new LoginPage(page);
        const cadastroPage = new CadastroPage(page);

        await loginPage.clicarBotaoRegistra();
        await cadastroPage.preencherCampoNome(nome);
        await cadastroPage.preencherCampoEmail(email);
        await cadastroPage.preencherCampoSenha(password);
        await cadastroPage.clicarBotaoCadastrar();

        await expect(cadastroPage.erroConfirmacaoSenha).toBeVisible();
    });

    test('CT.CAD.09: Validar cadastro com saldo de R$ 1.000,00', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const telaPrincipalContaPage = new TelaPrincipalContaPage(page);

        await cadastrarComSaldo(page, nome, email, password);
        await fazerLoginComCredenciais(page, email, password);
        
        await telaPrincipalContaPage.verificarSaldoInicial('R$ 1.000,00');
    });

    test('CT.CAD.10: Validar cadastro com saldo de R$ 0,00', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const password = fakerPT_BR.internet.password();

        const telaPrincipalContaPage = new TelaPrincipalContaPage(page);

        await cadastrarSemSaldo(page, nome, email, password);
        await fazerLoginComCredenciais(page, email, password);
        
        await telaPrincipalContaPage.verificarSaldoInicial('R$ 0,00');
    });

});
