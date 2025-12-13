
import { LoginPage } from '../pages/LoginPage.js';
import { TelaPrincipalContaPage } from '../pages/TelaPrincipalContaPage.js';


export async function fazerLoginComCredenciais(page, email, password) {
    const loginPage = new LoginPage(page);
    const telaPrincipalContaPage = new TelaPrincipalContaPage(page);
    
    await loginPage.fazerLogin(email, password);
    
    // Aguardar a tela principal carregar
    await telaPrincipalContaPage.nomeCliente.waitFor({ state: 'visible', timeout: 10000 });
}