
import { LoginPage } from '../pages/LoginPage.js';
import { CadastroPage } from '../pages/CadastroPage.js';


export async function cadastrarComSaldo(page, nome, email, password) {
    const loginPage = new LoginPage(page);
    const cadastroPage = new CadastroPage(page);

    await loginPage.clicarBotaoRegistrar();
    await cadastroPage.realizarCadastroComSaldo(nome, email, password);
    
}

export async function cadastrarSemSaldo(page, nome, email, password) {
    const loginPage = new LoginPage(page);
    const cadastroPage = new CadastroPage(page);

    await loginPage.clicarBotaoRegistra();
    await cadastroPage.realizarCadastroSemSaldo(nome, email, password);
    
    
}
