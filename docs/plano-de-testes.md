# 🧪 Plano de Testes Automatizados – Bug Bank

## 1. Introdução

Este documento descreve o plano e a estratégia para a automação dos testes da aplicação web Bug Bank. O objetivo principal é garantir que as funcionalidades críticas da aplicação atendam aos requisitos definidos e mantenham sua integridade ao longo do ciclo de desenvolvimento.

A automação será desenvolvida utilizando o framework **Playwright**.

## 2. Escopo dos Testes

### 2.1. Funcionalidades no Escopo (In-Scope)

As seguintes funcionalidades serão cobertas pelos testes automatizados:

- **Cadastro de Conta:** Validação do fluxo de criação de novas contas, incluindo campos obrigatórios e a opção de saldo inicial.
- **Login:** Autenticação de usuários, cobrindo cenários de sucesso e falha.
- **Transferência:** Fluxo de transferência de valores entre contas, incluindo validações de saldo e de conta de destino.
- **Extrato:** Verificação da exibição correta das transações e do saldo da conta.

### 2.2. Funcionalidades Fora do Escopo (Out-of-Scope)

- **Pagamento e Saque:** Funcionalidades marcadas como "Em desenvolvimento".
- **Testes de Performance e Carga:** O foco será em testes funcionais e E2E.
- **Testes de Usabilidade:** A automação validará a funcionalidade, não a experiência subjetiva do usuário.
- **Testes de Segurança Aprofundados:** (Ex: Testes de penetração).

## 3. Estratégia de Testes

A estratégia será focada em testes **End-to-End (E2E)**, simulando as jornadas do usuário desde o início ao fim.

- **Abordagem:** Utilizaremos o padrão **Page Objects Model (POM)** para organizar o código, melhorar a manutenibilidade e reduzir a duplicação. Cada página da aplicação (Cadastro, Login, Transferência, Extrato) terá sua própria classe responsável por mapear seus elementos e interações.

- **Dados de Teste:** Serão gerados dados dinâmicos (usando bibliotecas como `faker-js`) para garantir que os testes sejam independentes e robustos. Como a aplicação não tem persistência, cada teste ou suíte de testes criará as contas necessárias para sua execução.

- **Execução:** Os testes serão configurados para rodar em múltiplos navegadores suportados pelo Playwright (Chromium, Firefox, WebKit) para garantir a compatibilidade cross-browser.

- **Validações (Assertions):** As validações serão feitas tanto na UI (verificando textos, visibilidade de elementos, mensagens de erro/sucesso) quanto em nível de API (interceptando respostas para validar o estado da aplicação de forma mais rápida e confiável quando aplicável).

## 4. Ambiente e Ferramentas

- **Framework de Automação:** Playwright
- **Linguagem:** TypeScript / JavaScript
- **Gerenciador de Pacotes:** NPM ou Yarn
- **Ambiente de Execução:** Node.js
- **Navegadores:** Chromium, Firefox, WebKit (Safari)
- **Relatórios:** Playwright HTML Reporter para visualização dos resultados dos testes.

## 5. Cenários de Teste de Alto Nível

Abaixo estão os principais cenários que serão automatizados para cada funcionalidade.

### 5.1. Cadastro (US.01, US.02, US.03)

| ID      | Cenário                                                              | Tipo  | Prioridade |
|---------|----------------------------------------------------------------------|-------|------------|
| CT.CAD.01 | Realizar cadastro com sucesso com a opção de saldo inicial ativada.  | E2E   | Alta       |
| CT.CAD.02 | Realizar cadastro com sucesso com a opção de saldo inicial desativada. | E2E   | Alta       |
| CT.CAD.03 | Validar mensagens de erro para cada campo obrigatório (Nome, Email, Senha, Confirmação). | E2E   | Alta       |
| CT.CAD.04 | Validar erro ao tentar cadastrar com senhas que não coincidem.       | E2E   | Média      |

### 5.2. Login (US.04)

| ID      | Cenário                                                              | Tipo  | Prioridade |
|---------|----------------------------------------------------------------------|-------|------------|
| CT.LOG.01 | Realizar login com sucesso e verificar redirecionamento para a home. | E2E   | Alta       |
| CT.LOG.02 | Validar mensagem de erro ao tentar login com email inválido.         | E2E   | Alta       |
| CT.LOG.03 | Validar mensagem de erro ao tentar login com senha incorreta.        | E2E   | Alta       |
| CT.LOG.04 | Validar mensagem de erro ao tentar login com campos em branco.       | E2E   | Alta       |

### 5.3. Transferência (US.05, US.06)

| ID      | Cenário                                                              | Tipo  | Prioridade |
|---------|----------------------------------------------------------------------|-------|------------|
| CT.TRA.01 | Realizar transferência com sucesso e validar o débito na conta de origem. | E2E   | Alta       |
| CT.TRA.02 | Validar redirecionamento para o extrato após transferência bem-sucedida. | E2E   | Alta       |
| CT.TRA.03 | Validar mensagem de erro ao tentar transferir para conta inválida.   | E2E   | Média      |
| CT.TRA.04 | Validar bloqueio de transferência com valor maior que o saldo.       | E2E   | Alta       |
| CT.TRA.05 | Validar erro ao tentar transferir valor zero ou negativo.            | E2E   | Média      |

### 5.4. Extrato (US.07)

| ID      | Cenário                                                              | Tipo  | Prioridade |
|---------|----------------------------------------------------------------------|-------|------------|
| CT.EXT.01 | Validar exibição do saldo inicial correto após cadastro com saldo.   | E2E   | Alta       |
| CT.EXT.02 | Validar exibição do saldo inicial correto após cadastro sem saldo.   | E2E   | Alta       |
| CT.EXT.03 | Validar que a transação de transferência enviada aparece no extrato. | E2E   | Alta       |
| CT.EXT.04 | Validar que o valor de débito no extrato é exibido em vermelho e com sinal negativo. | E2E | Média |

## 6. Riscos e Mitigações

| Risco                                                                 | Mitigação                                                                                             |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Falta de persistência de dados:** Os dados são resetados a cada reload. | Cada suíte de teste será responsável por criar sua própria massa de dados (contas) antes da execução. |
| **Mudanças frequentes na UI:** Podem quebrar os seletores dos testes. | Utilizar seletores robustos e menos propensos a quebras (ex: `data-testid`) e aplicar o Page Objects Model. |
| **Requisitos implícitos:** Funcionalidades como "saldo insuficiente" podem não ter mensagens de erro claras. | Trabalhar em conjunto com a equipe de desenvolvimento para definir e padronizar as mensagens de erro. |

## 7. Entregáveis

- Código-fonte dos scripts de automação.
- Relatórios de execução de testes (Playwright HTML Reporter).
- Documentação atualizada (README.md) sobre como configurar e executar os testes.