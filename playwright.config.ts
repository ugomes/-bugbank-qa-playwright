import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Diretório onde os arquivos de teste (specs) estão localizados.
  testDir: '.',

  // Rodar testes em paralelo.
  fullyParallel: true,

  // Configurações do reporter. 'html' gera um relatório web.
  reporter: 'html',

  use: {
    // URL base para as ações de navegação (ex: page.goto('/')).
    baseURL: 'http://localhost:3000',

    // Captura screenshots apenas em caso de falha.
    screenshot: 'only-on-failure',

    // Grava vídeo apenas na primeira nova tentativa (retry).
    video: 'on-first-retry',

    // Coleta trace quando o teste falha na primeira tentativa.
    trace: 'on-first-retry',
  },

  // Configuração dos projetos para rodar nos principais navegadores.
  projects: [
    {name: 'chromium', use: { ...devices['Desktop Chrome'], headless: false } },
    
   
    ],
});
