# 📖 Histórias de Usuário – Bug Bank

Este documento traduz os requisitos da aplicação em Histórias de Usuário, focando no valor entregue ao cliente.

**Persona Principal:** Cliente do banco (ou Usuário da plataforma).

---

## Funcionalidade: Cadastro de Conta

### US.01: Realizar cadastro na plataforma

**Como um** novo usuário,
**Eu quero** me cadastrar na plataforma com meu nome, email e senha,
**Para que** eu possa criar uma conta e acessar os serviços do Bug Bank.

**Critérios de Aceite (AC):**
- AC 01: O sistema deve exibir uma mensagem de sucesso contendo o número da conta criada.
- AC 02: O cadastro só deve ser concluído se os campos `Nome`, `Email`, `Senha` e `Confirmação de Senha` estiverem preenchidos.
- AC 03: A `Senha` e a `Confirmação de Senha` devem ser idênticas.

### US.02: Receber feedback sobre campos obrigatórios no cadastro

**Como um** novo usuário,
**Eu quero** ser informado sobre campos obrigatórios não preenchidos durante o cadastro,
**Para que** eu possa corrigir os dados e completar meu registro com sucesso.

**Critérios de Aceite (AC):**
- AC 01: Se o campo `Nome` não for preenchido, a mensagem "Nome não pode ser vazio" deve ser exibida.
- AC 02: Se o campo `Email` não for preenchido, a mensagem "Email não pode ser vazio" deve ser exibida.
- AC 03: Se o campo `Senha` não for preenchido, a mensagem "Senha não pode ser vazio" deve ser exibida.
- AC 04: Se o campo `Confirmação de Senha` não for preenchido, a mensagem "Confirmar senha não pode ser vazio" deve ser exibida.

### US.03: Escolher se a conta será criada com saldo inicial

**Como um** novo usuário,
**Eu quero** ter a opção de criar minha conta com um saldo inicial pré-definido,
**Para que** eu possa começar a usar a plataforma com ou sem fundos.

**Critérios de Aceite (AC):**
- AC 01: Se a opção "Criar conta com saldo" estiver ativa, a conta deve ser criada com um saldo de R$ 1.000,00.
- AC 02: Se a opção "Criar conta com saldo" estiver inativa, a conta deve ser criada com um saldo de R$ 0,00.

---

## Funcionalidade: Login

### US.04: Acessar minha conta

**Como um** usuário cadastrado,
**Eu quero** fazer login usando meu email e senha,
**Para que** eu possa ser direcionado para a página principal da minha conta.

**Critérios de Aceite (AC):**
- AC 01: Ao inserir credenciais válidas e clicar em "Acessar", devo ser redirecionado para a página de extrato/home.
- AC 02: Se eu tentar acessar com um email não cadastrado ou senha incorreta, o acesso não deve ser autorizado e uma mensagem de erro deve ser exibida.
- AC 03: Se eu tentar acessar sem preencher os campos `Email` e `Senha`, a mensagem "Usuário e senha precisam ser preenchidos" deve ser exibida.

---

## Funcionalidade: Transferência

### US.05: Realizar transferência para outra conta

**Como um** cliente do banco,
**Eu quero** transferir um valor da minha conta para outra conta válida,
**Para que** eu possa movimentar meu dinheiro.

**Critérios de Aceite (AC):**
- AC 01: A transferência só deve ser permitida se o saldo em minha conta for maior ou igual ao valor da transferência.
- AC 02: Após a transferência, o valor deve ser debitado do meu saldo.
- AC 03: Uma mensagem de "Transferência realizada com sucesso" deve ser exibida.
- AC 04: Após a mensagem de sucesso, devo ser redirecionado para a página de extrato.
- AC 05: O valor da transferência deve ser maior que zero.

### US.06: Ser informado sobre falhas na transferência

**Como um** cliente do banco,
**Eu quero** ser notificado quando uma transferência não puder ser concluída,
**Para que** eu entenda o motivo da falha.

**Critérios de Aceite (AC):**
- AC 01: Se eu tentar transferir para uma conta inválida ou inexistente, a mensagem "Conta inválida ou inexistente" deve ser exibida.
- AC 02: Se eu tentar transferir um valor maior que o meu saldo, a transferência não deve ser concluída e uma mensagem de erro apropriada deve ser exibida.

---

## Funcionalidade: Extrato

### US.07: Consultar meu extrato

**Como um** cliente do banco,
**Eu quero** visualizar o extrato da minha conta,
**Para que** eu possa acompanhar minhas transações e meu saldo.

**Critérios de Aceite (AC):**
- AC 01: O extrato deve exibir o saldo disponível atual.
- AC 02: Cada transação no extrato deve mostrar a data, o tipo (ex: "Transferência enviada") e a descrição.
- AC 03: Transações de saída (débito) devem ser exibidas em vermelho e com sinal negativo (-).
- AC 04: Transações de entrada (crédito) devem ser exibidas em verde.