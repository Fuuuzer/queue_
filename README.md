# queue_ - Ticket System 

aplicação completa de gerenciamento de tickets com backend estruturado (clean architecture básica) e interface frontend integrada.


## 📂 Estrutura do projeto

- backend/ → API REST (Node.js + Prisma)
- frontend/ → Interface para consumo da API




## 🚀 Tecnologias

### Backend
- Node.js
- Express
- TypeScript
- Prisma
- MySQL (Docker)

### Frontend
- Em desenvolvimento (iniciado com Vite)

### Rodando o backend

```
cd backend
npm install
npx prisma db push
npx prisma generate
npm run dev
```




### 🐳 Subindo banco com Docker

```
docker run --name mysql-ticket \
-e MYSQL_ROOT_PASSWORD=123456 \
-e MYSQL_DATABASE=tickets \
-p 3306:3306 \
-d mysql
```






## 📌 API

### Criar ticket
POST /tickets  

### Listar tickets
GET /tickets?page=1&status=OPEN

### Atualizar status
PATCH /tickets/:id/status






## ✅ Funcionalidades

- Criar tickets
- Listar tickets com paginação
- Filtrar por status
- Atualizar status com validação de fluxo
- Identificador humano (`ticketNumber`)





## 🧠 Regras de negócio

- O sistema controla transições de status:

OPEN → IN_PROGRESS, RESOLVED  
IN_PROGRESS → RESOLVED  
RESOLVED → IN_PROGRESS, CLOSED  
CLOSED → não pode ser alterado




## 🎯 Objetivo do projeto

Projeto criado para praticar construção de APIs REST com regras de negócio reais, incluindo controle de estado e padronização de arquitetura backend.

