
import { expect } from '@playwright/test';

class TelaPrincipalContaPage {
    constructor(page) {
        this.page = page;
        this.valorSaldo = this.page.locator('#textBalance span');
        this.nomeCliente = this.page.locator('#textName');
        this.numeroConta = this.page.locator('#textAccountNumber span');
        
        // Botões de transação
        this.botaoTransferencia = this.page.locator('#btn-PAGAMENTOS');
        this.botaoExtrato = this.page.locator('#btn-EXTRATO');
        this.botaoSaque = this.page.locator('#btn-SAQUE');
    }

    async verificarSaldoInicial(saldoEsperado) {
        await expect(this.valorSaldo).toHaveText(saldoEsperado);
    }

    async verificarNomeCliente(nomeEsperado) {
        await expect(this.nomeCliente).toContainText(nomeEsperado);
    }

    

    async verificarNumeroContaValido() {
        const numero = await this.numeroConta.textContent();
        expect(numero).toMatch(/^\d+-\d+$/);
    }

    async verificarBotoesTransacoes() {
        await expect(this.page.getByText('TRANSFERÊNCIA')).toBeVisible();
        await expect(this.page.getByText('PAGAMENTOS')).toBeVisible();
        await expect(this.page.getByText('EXTRATO')).toBeVisible();
        await expect(this.page.getByText('SAQUE')).toBeVisible();
    }
}

module.exports = { TelaPrincipalContaPage };
