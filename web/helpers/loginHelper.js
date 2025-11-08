
import { LoginPage } from '../pages/LoginPage.js';


export async function fazerLoginComCredenciais(page, email, password) {
    const loginPage = new LoginPage(page);
    await loginPage.fazerLogin(email, password);
}