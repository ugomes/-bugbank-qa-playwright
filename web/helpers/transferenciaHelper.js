import { LoginPage } from '../pages/LoginPage.js';
import { CadastroPage } from '../pages/CadastroPage.js';
import { TelaPrincipalContaPage } from '../pages/TelaPrincipalContaPage.js';
import { TelaHomePage } from '../pages/TelaHomePage.js';
import { TransferenciaPage } from '../pages/TransferenciaPage.js';

/**
 * Função auxiliar para criar uma conta, fazer login e retornar o número da conta
 * @param {Page} page - Instância da página do Playwright
 * @param {string} nome - Nome do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {boolean} comSaldo - Se deve criar conta com saldo (default: true)
 * @returns {Promise<string>} Número da conta criada no formato "XXX-X"
 */
export async function criarContaEFazerLogin(page, nome, email, password, comSaldo = true) {
    const loginPage = new LoginPage(page);
    const cadastroPage = new CadastroPage(page);
    const telaPrincipalContaPage = new TelaPrincipalContaPage(page);

    // Ir para página de cadastro
    await loginPage.clicarBotaoRegistrar();
    
    // Realizar cadastro - já fecha a modal automaticamente
    if (comSaldo) {
        await cadastroPage.realizarCadastroComSaldo(nome, email, password);
    } else {
        await cadastroPage.realizarCadastroSemSaldo(nome, email, password);
    }
    
    // Aguardar um pouco para garantir que a modal foi fechada
    await page.waitForTimeout(500);
    
    // Fazer login
    await loginPage.preencherCampoEmail(email);
    await loginPage.preencherCampoSenha(password);
    await loginPage.clicarBotaoAcessar();

    // Aguardar carregar a tela principal
    await telaPrincipalContaPage.nomeCliente.waitFor({ state: 'visible', timeout: 10000 });
    await telaPrincipalContaPage.verificarNomeCliente(nome);
    
    // Obter e retornar o número da conta
    const numeroConta = await telaPrincipalContaPage.numeroConta.textContent();
    return numeroConta.trim();
}

/**
 * Função auxiliar para navegar até a página de transferência
 * @param {Page} page - Instância da página do Playwright
 */
export async function navegarParaTransferencia(page) {
    const telaHomePage = new TelaHomePage(page);
    await telaHomePage.botaoTransferencia.waitFor({ state: 'visible' });
    await telaHomePage.clicarBotaoTransferencia();
    
    // Aguardar a página de transferência carregar
    await page.waitForURL('**/transfer', { timeout: 5000 }).catch(() => {});
}

/**
 * Função auxiliar para extrair número e dígito da conta
 * @param {string} contaCompleta - Número da conta no formato "XXX-X"
 * @returns {Object} Objeto com numero e digito separados
 */
export function extrairNumeroConta(contaCompleta) {
    const partes = contaCompleta.split('-');
    return {
        numero: partes[0],
        digito: partes[1]
    };
}

/**
 * Função auxiliar para realizar uma transferência completa
 * @param {Page} page - Instância da página do Playwright
 * @param {string} contaDestino - Número da conta destino
 * @param {string} valor - Valor da transferência
 * @param {string} descricao - Descrição da transferência
 */
export async function realizarTransferenciaCompleta(page, contaDestino, valor, descricao) {
    const transferenciaPage = new TransferenciaPage(page);
    const { numero, digito } = extrairNumeroConta(contaDestino);
    
    await transferenciaPage.realizarTransferencia(numero, digito, valor, descricao);
}
