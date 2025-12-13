import { expect } from '@playwright/test';

class ExtratoPage {
    constructor(page) {
        this.page = page;
        
        // Locators principais
        // O saldo no extrato aparece como o segundo parágrafo após 'Saldo disponível'
        this.valorSaldo = this.page.locator('text=Saldo disponível').locator('xpath=following-sibling::p[1]');
        this.tituloExtrato = this.page.locator('#textBalanceAvailable');
        
        // Locators de transações
        this.listaTransacoes = this.page.locator('#transaction-list');
        this.transacoes = this.page.locator('[id^="textTransferValue"]');
        this.descricaoTransacoes = this.page.locator('[id^="textDescription"]');
        this.dataTransacoes = this.page.locator('[id^="textTransferDate"]');
        
        // Botão voltar
        this.btnVoltar = this.page.locator('#btnBack');
    }

    async verificarSaldo(saldoEsperado) {
        // Remove 'R$', espaços e compara apenas o valor
        let saldoAtual = await this.valorSaldo.textContent();
        saldoAtual = saldoAtual.replace(/R\$\s*/, '').replace(/\u00a0/g, '').trim();
        expect(saldoAtual).toBe(saldoEsperado);
    }

    async obterSaldoAtual() {
        const saldoText = await this.valorSaldo.textContent();
        return saldoText;
    }

    async verificarTransacaoNoExtrato(descricao) {
        const transacao = this.page.locator(`[id^="textDescription"]:has-text("${descricao}")`);
        await expect(transacao).toBeVisible();
    }

    async verificarValorTransacaoDebito(valor) {
        // Busca pelo valor no formato '-R$ 200,00'
        const valorFormatado = `-R$ ${valor}`;
        const transacaoValor = this.page.locator(`[id^="textTransferValue"]:has-text("${valorFormatado}")`);
        await expect(transacaoValor).toBeVisible();
    }

    async verificarTransacaoDebitoEmVermelho(descricao) {
        const transacao = this.page.locator(`[id^="textDescription"]:has-text("${descricao}")`);
        const container = transacao.locator('..');
        const valorElement = container.locator('[id^="textTransferValue"]');
        
        // Verificar se o valor está em vermelho (cor negativa)
        await expect(valorElement).toHaveCSS('color', 'rgb(255, 0, 0)');
    }

    async contarTransacoes() {
        return await this.transacoes.count();
    }

    async verificarExtratoVazio() {
        const count = await this.transacoes.count();
        expect(count).toBe(0);
    }

    async clicarBotaoVoltar() {
        await this.btnVoltar.click();
    }

    async obterPrimeiraTransacao() {
        const descricao = await this.descricaoTransacoes.first().textContent();
        const valor = await this.transacoes.first().textContent();
        const data = await this.dataTransacoes.first().textContent();
        
        return {
            descricao,
            valor,
            data
        };
    }
}

module.exports = { ExtratoPage };
