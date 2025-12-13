import { test, expect } from '@playwright/test';
import { fakerPT_BR } from '@faker-js/faker';
import { TransferenciaPage } from '../../pages/TransferenciaPage.js';
import { ExtratoPage } from '../../pages/ExtratoPage.js';
import { TelaHomePage } from '../../pages/TelaHomePage.js';
import { TelaPrincipalContaPage } from '../../pages/TelaPrincipalContaPage.js';
import { 
    criarContaEFazerLogin, 
    navegarParaTransferencia, 
    extrairNumeroConta,
    realizarTransferenciaCompleta 
} from '../../helpers/transferenciaHelper.js';
import { fazerLoginComCredenciais } from '../../helpers/loginHelper.js';
import '../../../hooks.js';

test.describe('Transferência entre contas', () => {

    test('CT.TRA.01: Realizar transferência com sucesso', async ({ page }) => {
        // Arrange - Preparar dados de teste
        const conta1Nome = fakerPT_BR.person.fullName();
        const conta1Email = fakerPT_BR.internet.email();
        const conta1Senha = fakerPT_BR.internet.password();

        const conta2Nome = fakerPT_BR.person.fullName();
        const conta2Email = fakerPT_BR.internet.email();
        const conta2Senha = fakerPT_BR.internet.password();

        const valorTransferencia = '200';
        const descricaoTransferencia = 'Transferência de teste';

        const transferenciaPage = new TransferenciaPage(page);
        const extratoPage = new ExtratoPage(page);
        const telaHomePage = new TelaHomePage(page);

        // Criar primeira conta (origem) com saldo
        const numeroConta1 = await criarContaEFazerLogin(page, conta1Nome, conta1Email, conta1Senha, true);

        // Sair e criar segunda conta (destino) com saldo
        await page.goto('/');
        const numeroConta2 = await criarContaEFazerLogin(page, conta2Nome, conta2Email, conta2Senha, true);

        // Fazer login novamente na conta de origem
        await page.goto('/');
        await fazerLoginComCredenciais(page, conta1Email, conta1Senha);

        // Act - Realizar transferência
        await navegarParaTransferencia(page);
        await realizarTransferenciaCompleta(page, numeroConta2, valorTransferencia, descricaoTransferencia);

        // Assert - Verificar mensagem de sucesso
        await transferenciaPage.verificarMensagemSucesso();
        await transferenciaPage.fecharModal();


        // Se estiver na tela de transferência, clicar em Voltar para ir para a home
        const btnVoltar = page.locator('text=Voltar');
        if (await btnVoltar.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btnVoltar.click();
        }
        // Agora sim, clicar em Extrato
        await telaHomePage.clicarBotaoExtrato();
        await expect(extratoPage.tituloExtrato).toBeVisible();

        // Verificar que o saldo foi debitado (saldo inicial era 1000, após transferir 200 deve ser 800)
        await extratoPage.verificarSaldo('800,00');

        // Verificar que a transação aparece no extrato
        await extratoPage.verificarTransacaoNoExtrato(descricaoTransferencia);

        // Verificar que o valor de débito está com sinal negativo
        await extratoPage.verificarValorTransacaoDebito('200,00');
    });

    test('CT.TRA.02: Validar erro ao tentar transferir para conta inválida', async ({ page }) => {
        // Arrange - Preparar dados de teste
        const conta1Nome = fakerPT_BR.person.fullName();
        const conta1Email = fakerPT_BR.internet.email();
        const conta1Senha = fakerPT_BR.internet.password();

        const numeroContaInvalida = '99999';
        const digitoInvalido = '9';
        const valorTransferencia = '100';
        const descricaoTransferencia = 'Tentativa de transferência inválida';

        const transferenciaPage = new TransferenciaPage(page);

        // Criar conta de origem com saldo
        await criarContaEFazerLogin(page, conta1Nome, conta1Email, conta1Senha, true);

        // Act - Tentar realizar transferência para conta inválida
        await navegarParaTransferencia(page);
        await transferenciaPage.realizarTransferencia(numeroContaInvalida, digitoInvalido, valorTransferencia, descricaoTransferencia);

        // Assert - Verificar mensagem de erro
        await transferenciaPage.verificarMensagemContaInvalida();
    });

    test('CT.TRA.03: Validar bloqueio de transferência com valor maior que o saldo', async ({ page }) => {
        // Arrange - Preparar dados de teste
        const conta1Nome = fakerPT_BR.person.fullName();
        const conta1Email = fakerPT_BR.internet.email();
        const conta1Senha = fakerPT_BR.internet.password();

        const conta2Nome = fakerPT_BR.person.fullName();
        const conta2Email = fakerPT_BR.internet.email();
        const conta2Senha = fakerPT_BR.internet.password();

        const valorTransferenciaMaiorQueSaldo = '1001';
        const descricaoTransferencia = 'Transferência com saldo insuficiente';

        const transferenciaPage = new TransferenciaPage(page);

        // Criar primeira conta (origem) com saldo de 1000
        const numeroConta1 = await criarContaEFazerLogin(page, conta1Nome, conta1Email, conta1Senha, true);

        // Criar segunda conta (destino)
        await page.goto('/');
        const numeroConta2 = await criarContaEFazerLogin(page, conta2Nome, conta2Email, conta2Senha, true);

        // Fazer login novamente na conta de origem
        await page.goto('/');
        await fazerLoginComCredenciais(page, conta1Email, conta1Senha);

        // Act - Tentar realizar transferência com valor maior que o saldo
        await navegarParaTransferencia(page);
        await realizarTransferenciaCompleta(page, numeroConta2, valorTransferenciaMaiorQueSaldo, descricaoTransferencia);

        // Assert - Verificar mensagem de saldo insuficiente
        await transferenciaPage.verificarMensagemSaldoInsuficiente();
    });

});
