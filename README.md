# 🤖 Projeto de Automação de Testes E2E - Bug Bank

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status do Projeto: Em Desenvolvimento">
  <img src="https://img.shields.io/badge/tested%20with-Playwright-2E8555?logo=playwright" alt="Testado com Playwright">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="Licença MIT">
</p>

<p align="center">
   <!-- Substitua <SEU_USUARIO> e <SEU_REPOSITORIO> pelo caminho correto do seu repositório no GitHub -->
   <img src="https://github.com/<SEU_USUARIO>/<SEU_REPOSITORIO>/actions/workflows/playwright.yml/badge.svg" alt="Status da Pipeline Playwright">
</p>

> **Integração Contínua:** Os testes E2E são executados automaticamente a cada push ou pull request na branch `main` usando o GitHub Actions. O relatório de testes é salvo como artefato e pode ser baixado na aba "Actions" do repositório.

> **Nota:** Todos os testes automatizados foram validados e executados localmente antes da configuração da pipeline CI.

> [!WARNING]
> **Este projeto está em desenvolvimento.**
> As funcionalidades e a estrutura do código podem mudar. O objetivo principal é o estudo e a aplicação de boas práticas em automação de testes com Playwright.

## 🎯 Sobre o Projeto

Este é um projeto de estudo focado na automação de testes End-to-End (E2E) da aplicação web **[Bug Bank](https://bugbank.netlify.app/)**. O objetivo é aplicar as melhores práticas de automação de testes, utilizando ferramentas modernas para garantir a qualidade e a integridade das funcionalidades da aplicação.

## ✨ Funcionalidades Testadas

A suíte de testes atual cobre as seguintes jornadas de usuário:

- ✔️ **Cadastro de Conta**: Validação do fluxo de criação de novas contas, com e sem saldo inicial.
- ✔️ **Login de Usuário**: Autenticação de usuários com cenários de sucesso e falha.
- ✔️ **Transferência**: Movimentação de valores entre contas, incluindo validações de saldo e de conta de destino.
- ✔️ **Extrato**: Verificação da exibição correta das transações e do saldo.

## 🚀 Stack de Tecnologia

- **Framework de Teste:** [Playwright](https://playwright.dev/)
- **Linguagem:** JavaScript
- **Geração de Dados:** [Faker.js](https://fakerjs.dev/)
- **Gerenciador de Pacotes:** NPM

## 📂 Estrutura do Projeto

O projeto utiliza o padrão de design **Page Objects Model (POM)** para garantir que o código seja reutilizável, legível e de fácil manutenção.
```
projeto-bug-bank/
├── web/
│   ├── support/
│   │   └── pages/       # Contém as classes de Page Objects (ex: cadastro.page.js)
│   └── test/            # Contém os arquivos de teste (specs) (ex: cadastro.spec.js)
├── docs/                # Documentação do projeto (Requisitos, Plano de Testes, etc.)
└── playwright.config.js # Arquivo de configuração do Playwright
```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```
## 🏁 Começando

3.  **Instale os navegadores do Playwright:**
    ```bash
    npx playwright install
    ```
Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

## ▶️ Executando os Testes
### Pré-requisitos

Para rodar a suíte de testes E2E, execute o seguinte comando no terminal:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [Git](https://git-scm.com/)

```bash
npx playwright test
```
### Instalação e Execução

Após a execução, um relatório detalhado será gerado na pasta `playwright-report`. Para visualizá-lo, use o comando:
1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd projeto-bug-bank
   ```

```bash
npx playwright show-report
```
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale os navegadores do Playwright:**
   ```bash
   npx playwright install
   ```

4. **Execute os testes:**
   ```bash
   # Para rodar todos os testes em modo headless (terminal)
   npx playwright test

   # Para abrir o relatório de testes após a execução
   npx playwright show-report
   ```

## 🤝 Como Contribuir

Contribuições são bem-vindas! Se você tem alguma sugestão para melhorar este projeto, sinta-se à vontade para criar um *fork* e abrir um *Pull Request*.

1.  Faça um *Fork* do projeto.
2.  Crie uma nova *Branch* (`git checkout -b feature/sua-feature`).
3.  Faça o *Commit* de suas alterações (`git commit -m 'feat: Adiciona sua feature'`).
4.  Faça o *Push* para a *Branch* (`git push origin feature/sua-feature`).
5.  Abra um *Pull Request*.


## 📖 Documentação QA

Consulte a pasta `docs/` para entender o processo completo de qualidade:

- **Análise Inicial:** Requisitos funcionais do Bug Bank
- **User Stories:** Histórias de usuário mapeadas
- **Plano de Teste:** Estratégia e critérios de teste
- **Casos de Teste:** Cenários detalhados de validação