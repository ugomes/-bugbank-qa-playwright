
class TelaHomePage {
    constructor(page) {
        this.page = page;
        this.botaoTransferencia = this.page.getByText('TRANSFERÊNCIA');
        this.botaoPagamentos = this.page.getByText('PAGAMENTOS');
        this.botaoExtrato = this.page.getByText('EXTRATO');
        this.botaoSaque = this.page.getByText('SAQUE');
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