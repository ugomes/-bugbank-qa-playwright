import { test, expect } from '@playwright/test';
import { fakerPT_BR } from '@faker-js/faker';
import { criarContaEFazerLogin } from '../../helpers/transferenciaHelper.js';
import { ExtratoPage } from '../../pages/ExtratoPage.js';
import { TelaHomePage } from '../../pages/TelaHomePage.js';
import { cadastrarComSaldo, cadastrarSemSaldo } from '../../helpers/cadastroHelper.js';
import { fazerLoginComCredenciais } from '../../helpers/loginHelper.js';
import '../../../hooks.js';


test.describe('Extrato - Bug Bank', () => {

    test('CT.EXT.01: Validar exibição do saldo inicial correto após cadastro com saldo', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const senha = fakerPT_BR.internet.password();

        await cadastrarComSaldo(page, nome, email, senha);
        await fazerLoginComCredenciais(page, email, senha);

        const telaHomePage = new TelaHomePage(page);
        await telaHomePage.clicarBotaoExtrato();
        const extratoPage = new ExtratoPage(page);
        await expect(extratoPage.valorSaldo).toBeVisible();
        await extratoPage.verificarSaldo('1.000,00');
    });

    test('CT.EXT.02: Validar exibição do saldo inicial correto após cadastro sem saldo', async ({ page }) => {
        const nome = fakerPT_BR.person.fullName();
        const email = fakerPT_BR.internet.email();
        const senha = fakerPT_BR.internet.password();

        await cadastrarSemSaldo(page, nome, email, senha);
        await fazerLoginComCredenciais(page, email, senha);

        const telaHomePage = new TelaHomePage(page);
        await telaHomePage.clicarBotaoExtrato();
        const extratoPage = new ExtratoPage(page);
        await expect(extratoPage.valorSaldo).toBeVisible();
        await extratoPage.verificarSaldo('0,00');
    });

    test('CT.EXT.03: Validar que a transação de transferência enviada aparece no extrato', async ({ page }) => {
        // Cria duas contas
        const nomeOrigem = fakerPT_BR.person.fullName();
        const emailOrigem = fakerPT_BR.internet.email();
        const senhaOrigem = fakerPT_BR.internet.password();
        const nomeDestino = fakerPT_BR.person.fullName();
        const emailDestino = fakerPT_BR.internet.email();
        const senhaDestino = fakerPT_BR.internet.password();
        const valor = '150';
        const descricao = 'Transferência para extrato';

        // Conta origem com saldo
        const numeroContaOrigem = await criarContaEFazerLogin(page, nomeOrigem, emailOrigem, senhaOrigem, true);
        // Conta destino
        await page.goto('/');
        const numeroContaDestino = await criarContaEFazerLogin(page, nomeDestino, emailDestino, senhaDestino, true);
        // Login novamente na origem
        await page.goto('/');
        await fazerLoginComCredenciais(page, emailOrigem, senhaOrigem);
        // Transferência
        const telaHomePage = new TelaHomePage(page);
        await telaHomePage.clicarBotaoTransferencia();
        const { realizarTransferenciaCompleta } = await import('../../helpers/transferenciaHelper.js');
        await realizarTransferenciaCompleta(page, numeroContaDestino, valor, descricao);
        // Fechar modal de sucesso da transferência, se visível
        const btnFecharModal = page.locator('#btnCloseModal');
        if (await btnFecharModal.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btnFecharModal.click();
        }
        // Voltar e ir para extrato
        const btnVoltar = page.locator('text=Voltar');
        if (await btnVoltar.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btnVoltar.click();
        }
        await telaHomePage.clicarBotaoExtrato();
        const extratoPage = new ExtratoPage(page);
        await extratoPage.verificarTransacaoNoExtrato(descricao);
    });

    test('CT.EXT.04: Validar que o valor de débito no extrato é exibido em vermelho e com sinal negativo', async ({ page }) => {
        // Cria duas contas
        const nomeOrigem = fakerPT_BR.person.fullName();
        const emailOrigem = fakerPT_BR.internet.email();
        const senhaOrigem = fakerPT_BR.internet.password();
        const nomeDestino = fakerPT_BR.person.fullName();
        const emailDestino = fakerPT_BR.internet.email();
        const senhaDestino = fakerPT_BR.internet.password();
        const valor = '200,00';
        const valorTransferir = '200';
        const descricao = 'Débito em vermelho';

        // Conta origem com saldo
        const numeroContaOrigem = await criarContaEFazerLogin(page, nomeOrigem, emailOrigem, senhaOrigem, true);
        // Conta destino
        await page.goto('/');
        const numeroContaDestino = await criarContaEFazerLogin(page, nomeDestino, emailDestino, senhaDestino, true);
        // Login novamente na origem
        await page.goto('/');
        await fazerLoginComCredenciais(page, emailOrigem, senhaOrigem);
        // Transferência
        const telaHomePage = new TelaHomePage(page);
        await telaHomePage.clicarBotaoTransferencia();
        const { realizarTransferenciaCompleta } = await import('../../helpers/transferenciaHelper.js');
        await realizarTransferenciaCompleta(page, numeroContaDestino, valorTransferir, descricao);
        // Fechar modal de sucesso da transferência, se visível
        const btnFecharModal = page.locator('#btnCloseModal');
        if (await btnFecharModal.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btnFecharModal.click();
        }
        // Voltar e ir para extrato
        const btnVoltar = page.locator('text=Voltar');
        if (await btnVoltar.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btnVoltar.click();
        }
        await telaHomePage.clicarBotaoExtrato();
        const extratoPage = new ExtratoPage(page);
        // Verifica valor negativo
        await extratoPage.verificarValorTransacaoDebito(valor);
        // Verifica cor vermelha
        await extratoPage.verificarTransacaoDebitoEmVermelho(descricao);
    });
});
