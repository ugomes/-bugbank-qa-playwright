import { expect } from '@playwright/test';

class TransferenciaPage {
    constructor(page) {
        this.page = page;
        
        // Locators dos campos do formulário
        this.campoNumeroConta = this.page.locator('input[name="accountNumber"]');
        this.campoDigito = this.page.locator('input[name="digit"]');
        this.campoValorTransferencia = this.page.locator('input[name="transferValue"]');
        this.campoDescricao = this.page.locator('input[name="description"]');
        this.btnTransferirAgora = this.page.getByRole('button', { name: 'Transferir agora' });
        
        // Locators de mensagens
        this.mensagemSucesso = this.page.locator('#modalText');
        this.mensagemErro = this.page.locator('#modalText');
        this.btnFecharModal = this.page.locator('#btnCloseModal');
    }

    async preencherNumeroConta(numeroConta) {
        await this.campoNumeroConta.fill(numeroConta);
    }

    async preencherDigito(digito) {
        await this.campoDigito.fill(digito);
    }

    async preencherValorTransferencia(valor) {
        await this.campoValorTransferencia.fill(valor);
    }

    async preencherDescricao(descricao) {
        await this.campoDescricao.fill(descricao);
    }

    async clicarBotaoTransferirAgora() {
        await this.btnTransferirAgora.click();
    }

    async fecharModal() {
        await this.btnFecharModal.click();
    }

    async realizarTransferencia(numeroConta, digito, valor, descricao) {
        await this.preencherNumeroConta(numeroConta);
        await this.preencherDigito(digito);
        await this.preencherValorTransferencia(valor);
        await this.preencherDescricao(descricao);
        await this.clicarBotaoTransferirAgora();
    }

    async verificarMensagemSucesso() {
        await expect(this.mensagemSucesso).toHaveText('Transferencia realizada com sucesso');
    }

    async verificarMensagemContaInvalida() {
        await expect(this.mensagemErro).toHaveText('Conta inválida ou inexistente');
    }

    async verificarMensagemSaldoInsuficiente() {
        await expect(this.mensagemErro).toContainText('Você não tem saldo suficiente para essa transação');
    }

    obterMensagemSucesso() {
        return this.mensagemSucesso;
    }

    obterMensagemErro() {
        return this.mensagemErro;
    }
}

module.exports = { TransferenciaPage };
