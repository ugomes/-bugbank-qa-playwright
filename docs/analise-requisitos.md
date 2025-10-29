# 📄 ANÁLISE INICIAL DE REQUISITOS – Bug Bank

## 🧩 Versão 1.0

| Data       | Versão | Descrição                                           | Autor    |
|------------|--------|-----------------------------------------------------|----------|
| 29/10/2025 | 1.0    | Análise inicial baseada nos requisitos fornecidos | Seu Nome |

## 1️⃣ Introdução
Este documento apresenta a análise inicial dos requisitos funcionais da aplicação Bug Bank, uma plataforma web de simulação bancária. O objetivo é compreender as funcionalidades, regras de negócio e o comportamento esperado do sistema para subsidiar o planejamento e a execução dos testes de qualidade.

## 2️⃣ Requisitos Funcionais Detalhados

### 2.1. Login

| ID Req.   | Descrição do Requisito                                                                                   |
|-----------|----------------------------------------------------------------------------------------------------------|
| RF.LOG.01 | `Email` e `Senha` são campos obrigatórios.                                                                 |
| RF.LOG.02 | Tentativa de acesso sem preencher campos obrigatórios deve exibir a mensagem "Usuário e senha precisam ser preenchidos". |
| RF.LOG.03 | Não deve autorizar o acesso para usuários inválidos ou não cadastrados.                                    |
| RF.LOG.04 | Usuários válidos e cadastrados são direcionados para a página inicial (home) da conta.                     |

### 2.2. Transferência

| ID Req.   | Descrição do Requisito                                                                                                   |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| RF.TRA.01 | Só é permitido transferência para contas válidas e existentes.                                                             |
| RF.TRA.02 | Só é permitido transferência quando o saldo da conta de origem é igual ou maior que o valor a ser transferido.             |
| RF.TRA.03 | Tentativa de transferência para conta inválida ou inexistente deve exibir mensagem de erro "Conta inválida ou inexistente". |
| RF.TRA.04 | Os campos `Número da conta` e `Dígito` aceitam apenas números.                                                               |
| RF.TRA.05 | O campo `Descrição` é um campo de preenchimento obrigatório.                                                               |
| RF.TRA.06 | O `Valor de transferência` não pode ser igual ou menor que zero.                                                           |
| RF.TRA.07 | Ao realizar transferência com sucesso, o valor deve ser debitado da conta de origem e exibida a mensagem de "Transferência realizada com sucesso". |
| RF.TRA.08 | Ao realizar uma transferência com sucesso, o usuário deve ser redirecionado para a página de extrato.                      |

### 2.3. Extrato

| ID Req.   | Descrição do Requisito                                                                                                   |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| RF.EXT.01 | Deve exibir o saldo disponível no momento.                                                                                 |
| RF.EXT.02 | Cada transação deve exibir a data em que foi realizada.                                                                    |
| RF.EXT.03 | Cada transação deve exibir o tipo da transação (Abertura de conta / Transferência enviada / Transferência recebida).       |
| RF.EXT.04 | Quando o valor for de saída da conta (débito), deve ser exibido em vermelho e iniciar com o sinal de menos/negativo (-).    |
| RF.EXT.05 | Quando o valor for de entrada na conta (crédito), deve ser exibido em verde.                                               |
| RF.EXT.06 | Transações sem comentário/descrição devem exibir (-).                                                                      |

### 2.4. Cadastro

| ID Req.   | Descrição do Requisito                                                                                                   |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| RF.CAD.01 | Os campos `Nome`, `Email`, `Senha` e `Confirmação de senha` são de preenchimento obrigatório.                                |
| RF.CAD.02 | Tentativa de cadastro sem preencher nome deve visualizar a mensagem "Nome não pode ser vazio".                             |
| RF.CAD.03 | Tentativa de cadastro sem preencher email deve visualizar a mensagem "Email não pode ser vazio".                             |
| RF.CAD.04 | Tentativa de cadastro sem preencher senha deve visualizar a mensagem "Senha não pode ser vazio".                             |
| RF.CAD.05 | Tentativa de cadastro sem preencher confirmação de senha deve visualizar a mensagem "Confirmar senha não pode ser vazio".    |
| RF.CAD.06 | Deixar ativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 1.000,00.                                    |
| RF.CAD.07 | Deixar inativo a opção "Criar conta com saldo" deve criar conta com saldo de R$ 0,00.                                      |
| RF.CAD.08 | `Senha` e `Confirmação de senha` precisam ser iguais.                                                                      |
| RF.CAD.09 | Cadastrar conta com sucesso deve exibir número da conta criada.                                                            |

### 2.5. Pagamento
Em desenvolvimento.

### 2.6. Saque
Em desenvolvimento.

## 3️⃣ Regras de Negócio (RN)
As regras de negócio são as diretrizes que governam como a aplicação deve operar. Baseado nos requisitos, identificamos as seguintes:

1.  **RN.01 - Validação de Saldo:** Uma transferência só pode ser concluída se o saldo da conta de origem for suficiente para cobrir o valor da transação.
2.  **RN.02 - Validação de Conta Destino:** A conta de destino para uma transferência deve ser válida e existente no sistema.
3.  **RN.03 - Integridade de Transação:** Uma transferência bem-sucedida implica no débito da conta de origem e no crédito na conta de destino, com atualização dos saldos.
4.  **RN.04 - Formato de Valores:** Valores de transferência devem ser positivos.
5.  **RN.05 - Formato de Campos Numéricos:** Campos como `Número da conta` e `Dígito` devem aceitar apenas caracteres numéricos.
6.  **RN.06 - Unicidade de E-mail (Implícito):** Embora não explicitamente nos requisitos de Login, para que o login funcione, o cadastro de e-mails deve ser único. (Será validado no cadastro).

## 4️⃣ Observações Adicionais
A aplicação Bug Bank não possui persistência de dados, o que significa que os dados de conta e transações são perdidos ao recarregar a página ou fechar o navegador. Isso impacta a estratégia de teste, exigindo a criação de massa de dados ou contas a cada execução de teste.
As funcionalidades de "Pagamento" e "Saque" ainda não foram detalhadas e estão marcadas como "Em desenvolvimento".