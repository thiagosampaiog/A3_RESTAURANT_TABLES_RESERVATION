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

- **Cancelar reserva (atendente:**  
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

## Observações

- O banco de dados SQLite será criado automaticamente na pasta `src/database/` como `reservas.db`.
- Se alterar a estrutura da tabela, apague o arquivo `reservas.db` para forçar a recriação.
- Use ferramentas como Postman, Insomnia ou curl para testar os endpoints.

---

## Scripts úteis

- `npm run dev` — inicia o servidor com nodemon (auto-reload)
- `npm start` — inicia o servidor normalmente

---

## Estrutura de pastas

![image](https://github.com/user-attachments/assets/5026ae41-a255-4ba7-bf4f-c4f9672882c7)

