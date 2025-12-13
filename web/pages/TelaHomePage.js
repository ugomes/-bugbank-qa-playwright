
class TelaHomePage {
    constructor(page) {
        this.page = page;
        this.botaoTransferencia = this.page.locator('#btn-TRANSFERÊNCIA');
        this.botaoPagamentos = this.page.locator('#btn-PAGAMENTOS');
        this.botaoExtrato = this.page.locator('#btn-EXTRATO');
        this.botaoSaque = this.page.locator('#btn-SAQUE');
    }

    async clicarBotaoTransferencia() {
        await this.botaoTransferencia.click();
    }

    async clicarBotaoPagamentos() {
        await this.botaoPagamentos.click();

    }
    async clicarBotaoExtrato() {
        await this.botaoExtrato.click();
    }
    async clicarBotaoSaque() {
        await this.botaoSaque.click();
    }
    
        
}

module.exports = { TelaHomePage };