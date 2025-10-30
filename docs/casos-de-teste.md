# 📋 Casos de Teste – Bug Bank

Este documento detalha os casos de teste para a aplicação Bug Bank, baseados nos [Requisitos Funcionais](analise-requisitos.md) e nas [Histórias de Usuário](user-stories.md).

---

## Funcionalidade: Cadastro de Conta

### CT.CAD.01: Realizar cadastro com sucesso com saldo inicial

- **Referências:** US.01, US.03, RF.CAD.01, RF.CAD.06, RF.CAD.09
- **Pré-condição:** Estar na página de cadastro.
- **Passos:**
  1. Preencher o campo `Email` com um email válido.
  2. Preencher o campo `Nome` com um nome válido.
  3. Preencher o campo `Senha` com uma senha válida.
  4. Preencher o campo `Confirmação de senha` com a mesma senha do passo 3.
  5. Manter a opção "Criar conta com saldo?" ativada.
  6. Clicar no botão "Cadastrar".
- **Resultado Esperado:**
  - Uma mensagem de sucesso "A conta XXX-X foi criada com sucesso" deve ser exibida.
  - O usuário deve poder fechar a mensagem de sucesso.

### CT.CAD.02: Realizar cadastro com sucesso sem saldo inicial

- **Referências:** US.01, US.03, RF.CAD.01, RF.CAD.07, RF.CAD.09
- **Pré-condição:** Estar na página de cadastro.
- **Passos:**
  1. Preencher o campo `Email` com um email válido.
  2. Preencher o campo `Nome` com um nome válido.
  3. Preencher o campo `Senha` com uma senha válida.
  4. Preencher o campo `Confirmação de senha` com a mesma senha do passo 3.
  5. Desativar a opção "Criar conta com saldo?".
  6. Clicar no botão "Cadastrar".
- **Resultado Esperado:**
  - Uma mensagem de sucesso "A conta XXX-X foi criada com sucesso" deve ser exibida.
  - O usuário deve poder fechar a mensagem de sucesso.

### CT.CAD.03: Validar mensagens de erro para campos obrigatórios

- **Referências:** US.02, RF.CAD.02, RF.CAD.03, RF.CAD.04, RF.CAD.05
- **Pré-condição:** Estar na página de cadastro.
- **Passos:**
  1. Clicar no botão "Cadastrar" sem preencher nenhum campo.
  2. Validar a mensagem de erro para o campo `Email`.
  3. Validar a mensagem de erro para o campo `Nome`.
  4. Validar a mensagem de erro para o campo `Senha`.
  5. Validar a mensagem de erro para o campo `Confirmação de senha`.
- **Resultado Esperado:**
  - A mensagem "É campo obrigatório".
 

### CT.CAD.04: Validar erro ao cadastrar com senhas que não coincidem

- **Referências:** US.01, RF.CAD.08
- **Pré-condição:** Estar na página de cadastro.
- **Passos:**
  1. Preencher todos os campos obrigatórios com dados válidos.
  2. Inserir uma senha no campo `Senha`.
  3. Inserir uma senha diferente no campo `Confirmação de senha`.
  4. Clicar no botão "Cadastrar".
- **Resultado Esperado:**
  - Uma mensagem de erro "As senhas não são iguais" é exibida.

---

## Funcionalidade: Login

### CT.LOG.01: Realizar login com sucesso

- **Referências:** US.04, RF.LOG.04
- **Pré-condição:** Ter uma conta de usuário válida e cadastrada.
- **Passos:**
  1. Estar na página de login.
  2. Preencher o campo `Email` com o email cadastrado.
  3. Preencher o campo `Senha` com a senha cadastrada.
  4. Clicar no botão "Acessar".
- **Resultado Esperado:**
  - O usuário deve ser redirecionado para a página de extrato/home.
  - O nome do usuário e o número da conta devem ser exibidos na página.

### CT.LOG.02: Validar erro ao tentar login com credenciais inválidas

- **Referências:** US.04, RF.LOG.03
- **Pré-condição:** Estar na página de login.
- **Passos:**
  1. Preencher o campo `Email` com um email não cadastrado.
  2. Preencher o campo `Senha` com qualquer senha.
  3. Clicar no botão "Acessar".
- **Resultado Esperado:**
  - Uma mensagem de erro informando que o usuário ou senha são inválidos deve ser exibida.

### CT.LOG.03: Validar erro ao tentar login com campos em branco

- **Referências:** US.04, RF.LOG.01, RF.LOG.02
- **Pré-condição:** Estar na página de login.
- **Passos:**
  1. Clicar no botão "Acessar" sem preencher os campos.
- **Resultado Esperado:**
  - A mensagem "Usuário e senha precisam ser preenchidos" deve ser exibida.

---

## Funcionalidade: Transferência

### CT.TRA.01: Realizar transferência com sucesso

- **Referências:** US.05, RF.TRA.01, RF.TRA.02, RF.TRA.07, RF.TRA.08
- **Pré-condição:**
  1. Estar logado em uma conta com saldo suficiente (ex: R$ 1.000,00).
  2. Ter os dados de uma segunda conta válida (conta destino).
- **Passos:**
  1. Navegar para a página de Transferência.
  2. Preencher o `Número da Conta` e `Dígito` da conta destino.
  3. Preencher o `Valor da transferência` com um valor menor que o saldo (ex: R$ 200,00).
  4. Preencher a `Descrição`.
  5. Clicar em "Transferir agora".
- **Resultado Esperado:**
  - A mensagem "Transferência realizada com sucesso" deve ser exibida.
  - O usuário deve ser redirecionado para a página de extrato.
  - O novo saldo na página de extrato deve refletir o débito da transferência.
  - A transação de transferência deve ser listada no extrato.

### CT.TRA.02: Validar erro ao tentar transferir para conta inválida

- **Referências:** US.06, RF.TRA.03
- **Pré-condição:** Estar logado e na página de Transferência.
- **Passos:**
  1. Preencher o `Número da Conta` e `Dígito` com dados de uma conta que não existe.
  2. Preencher os demais campos com dados válidos.
  3. Clicar em "Transferir agora".
- **Resultado Esperado:**
  - A mensagem "Conta inválida ou inexistente" deve ser exibida.

### CT.TRA.03: Validar bloqueio de transferência com valor maior que o saldo

- **Referências:** US.06, RN.01
- **Pré-condição:** Estar logado em uma conta com saldo de R$ 1.000,00 e na página de Transferência.
- **Passos:**
  1. Preencher os dados de uma conta destino válida.
  2. Preencher o `Valor da transferência` com um valor maior que o saldo (ex: R$ 1.001,00).
  3. Clicar em "Transferir agora".
- **Resultado Esperado:**
  - Uma mensagem de erro "Saldo insuficiente para realizar a transferência" deve ser exibida.
  - A transferência não deve ser concluída.