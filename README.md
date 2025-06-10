# Relatório do Projeto - Sistema de Reservas de Mesas

## Integrantes
- Thiago Galdino Sampaio - RA _1272316314
- Gabriel Silva Miranda - RA _1272310532
- Eduarda Cruz de Oliveira - RA _12723120160
- Cauã Yoshito Yamaji Nogueira - RA _12723134391
- Aurea dos Reis Santos Neta - RA _12723131562
- Grasielly Conceição dos Santos - RA _1272320812
---

## Ferramentas Utilizadas

- **Linguagem:** JavaScript (Node.js)
- **Banco de Dados:** SQLite
- **Framework:** Express.js
- **Bibliotecas:** sqlite3, nodemon (dev), path
- **HTML e CSS**

---

## Justificativa da abordagem de comunicação

Optamos por utilizar uma **API REST** com Express.js, pois:
- Já estamos acostumados com API Rest.
- É o mais implementado durante os projetos da A3
- É simples de implementar e testar.
- Permite fácil integração com diferentes clientes (web, mobile, etc).

---

## Vídeo de Demonstração

[Link para o vídeo no YouTube](COLE_AQUI_O_LINK_DO_VIDEO)


# A3_RESTAURANT_TABLES_RESERVATION

Sistema de reservas de mesas para restaurante, com controle de reservas por atendente, confirmação por garçom e relatórios para gerente.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/thiagosampaiog/A3_RESTAURANT_TABLES_RESERVATION.git
   cd A3_RESTAURANT_TABLES_RESERVATION
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## Como rodar o projeto

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
   O servidor irá rodar por padrão na porta `3000`.

2. **Acesse a API:**
   - Teste o endpoint principal:  
     [http://localhost:3000/](http://localhost:3000/)

---

## Endpoints principais

- **Criar reserva (atendente):**  
  `POST /reserva`  

- **Cancelar reserva (atendente):**  
  `DELETE /reserva/:id`

- **Confirmar reserva (garçom):**  
  `PATCH /reserva/:id/confirmar`
  
- **Relatórios (gerente):**
  - Reservas por período:  
    `GET /relatorio/periodo?inicio=YYYY-MM-DD&fim=YYYY-MM-DD&status=confirmada`
  - Reservas por mesa:  
    `GET /relatorio/mesa/:mesa`
  - Mesas confirmadas por garçom:  
    `GET /relatorio/garcom/:garcom`

---

## Funcionalidades

- **Atendente:**  
  - Criar reservas (com validação de dados)
  - Cancelar reservas por ID
- **Garçom:**  
  - Confirmar reservas por ID e nome do garçom
- **Gerente:**  
  - Consultar relatórios de reservas por período, por mesa e por garçom

---

## Validações

### Frontend

- Todos os campos obrigatórios dos formulários são validados pelo atributo `required` no HTML.
- Campos numéricos (`mesa`, `pessoas`, `id`) só aceitam números.
- O JavaScript converte os campos `mesa` e `pessoas` para número antes de enviar ao backend.
- O frontend só envia a requisição se todos os campos estiverem preenchidos corretamente.
- Mensagens de erro e sucesso são exibidas dinamicamente, e só uma mensagem aparece por vez.

### Backend

- **Criação de Reserva:**
  - `data` deve existir, estar no formato `YYYY-MM-DD`, ser uma data válida e entre 2020 e 2100.
  - `hora` deve existir e estar no formato `HH:MM`.
  - `mesa` deve existir, ser número positivo e menor ou igual a 50.
  - `pessoas` deve existir, ser número positivo e menor ou igual a 20.
  - `responsavel` deve existir e ter pelo menos 2 caracteres.
  - Não permite criar reserva se já existir uma reserva para a mesma mesa, data e hora.
- **Cancelamento de Reserva:**
  - O ID deve ser informado e existir no banco.
- **Confirmação de Reserva:**
  - O ID deve ser informado e existir no banco com status `pendente`.
  - O nome do garçom deve ser informado.
- **Relatórios:**
  - Parâmetros obrigatórios são validados (ex: datas para relatório por período).

---

## Endpoints

### Atendente

- **Criar reserva:**  
  `POST /reserva`  
  **Body:**  
  ```json
  {
    "data": "YYYY-MM-DD",
    "hora": "HH:MM",
    "mesa": 1,
    "pessoas": 2,
    "responsavel": "Nome"
  }
  ```
  **Resposta:**  
  - Sucesso: `{ "message": "Reserva criada com sucesso", "reservaId": 1 }`
  - Erro: `{ "message": ["lista de erros"] }`

- **Cancelar reserva:**  
  `DELETE /reserva/:id`  
  **Resposta:**  
  - Sucesso: `{ "message": "Reserva cancelada com sucesso!" }`
  - Erro: `{ "message": "Reserva não encontrada" }`

### Garçom

- **Confirmar reserva:**  
  `PATCH /reserva/:id/confirmar`  
  **Body:**  
  ```json
  { "garcom": "Nome do Garçom" }
  ```
  **Resposta:**  
  - Sucesso: `{ "message": "Reserva confirmada!" }`
  - Erro: `{ "message": "Reserva não encontrada ou já confirmada" }`

### Gerente

- **Relatório por período:**  
  `GET /relatorio/periodo?inicio=YYYY-MM-DD&fim=YYYY-MM-DD[&status=confirmada]`  
  **Resposta:**  
  - Sucesso: `[ {reserva1}, {reserva2}, ... ]`
  - Erro: `{ "message": "Nenhuma reserva encontrada para o período." }`

- **Relatório por mesa:**  
  `GET /relatorio/mesa/:mesa`  
  **Resposta:**  
  - Sucesso: `[ {reserva1}, ... ]`
  - Erro: `{ "message": "Nenhuma reserva encontrada para esta mesa" }`

- **Relatório por garçom:**  
  `GET /relatorio/garcom/:garcom`  
  **Resposta:**  
  - Sucesso: `[ {reserva1}, ... ]`
  - Erro: `{ "message": "Nenhuma mesa confirmada por este garçom." }`

---

## Observações

- Todas as respostas de erro do backend são em JSON, com o campo `message`.
- O frontend exibe mensagens de erro e sucesso de forma clara para o usuário.
- O sistema impede reservas duplicadas para a mesma mesa, data e hora.
- O status inicial de toda reserva é `pendente` e só muda para `confirmada` após ação do garçom.

- O banco de dados SQLite será criado automaticamente na pasta `src/database/` como `reservas.db`.
- Se alterar a estrutura da tabela, apague o arquivo `reservas.db` para forçar a recriação.
- Use ferramentas como Postman, Insomnia ou curl para testar os endpoints.

---



