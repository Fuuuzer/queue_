   # queue_: guia para retomar o projeto

Documentação baseada no código e no histórico Git locais em 19/10/2026.

## 1. O que você está construindo

Um sistema de chamados fullstack para estudar autenticação, APIs REST, permissões, banco relacional e integração com React. O usuário se cadastra, faz login e abre tickets. A equipe de suporte acompanha os chamados e altera seus estados; administradores também podem excluí-los.

**Stack:** React 19, TypeScript, Vite, React Router e Axios no frontend; Node.js, Express 5, TypeScript, Prisma 6, PostgreSQL e JWT no backend. O README original indica hospedagem do banco no Neon.

O backend está mais completo que a interface: já existem regras de permissões e histórico de status, mas ainda não há telas para todas essas operações.

## 2. Como as peças se conectam

```text
Página React → função em src/api → Axios → rota Express
             → middleware de autenticação → controller
             → service → Prisma → PostgreSQL
```

- `backend/src/server.ts`: inicia a API na porta 3000.
- `backend/src/app.ts`: configura JSON, CORS, rotas e tratamento de erros.
- `backend/src/modules/`: módulos `auth`, `user`, `ticket` e geração de token.
- `*.routes.ts`: associa método HTTP e caminho aos handlers.
- `*.controller.ts`: lê a requisição, chama o serviço e monta a resposta HTTP.
- `*.service.ts`: aplica regras de negócio e acessa o banco pelo Prisma.
- `backend/src/middlewares/authVerify.ts`: verifica a assinatura do JWT.
- `backend/src/middlewares/errorHandler.ts`: transforma erros em respostas JSON.
- `backend/prisma/schema.prisma`: define entidades e relações.
- `frontend/src/App.tsx`: declara as páginas e sua proteção.
- `frontend/src/api/api.ts`: instância compartilhada do Axios e interceptadores.
- `frontend/src/contexts/AuthContext.tsx`: disponibiliza login, logout, token e estado de autenticação.
- `frontend/src/components/ProtectedRoute.tsx`: decide se renderiza a página ou redireciona.

É uma organização em camadas por módulo. Os services acessam diretamente o Prisma; não há uma camada separada de repositórios.

## 3. Rotas da interface

| Caminho | Acesso | Comportamento atual |
| --- | --- | --- |
| `/` | Todos | Redireciona para `/login` |
| `/login` | Sem login | Formulário de autenticação |
| `/register` | Sem login | Cadastro com login automático |
| `/tickets` | Autenticado | Lista tickets e permite navegar entre páginas |
| `/tickets/create` | Autenticado | Formulário de título e descrição |
| `/dashboard` | Autenticado | Apenas texto de placeholder |

Quem já está autenticado e acessa login ou cadastro é redirecionado para `/tickets`. Quem tenta abrir uma página protegida sem autenticação vai para `/login`. Não há rota de página não encontrada nem restrição de páginas por papel.

A listagem mantém `page` na URL, por exemplo `/tickets?page=2`. Os filtros de status e número existem na API, mas não têm controles na tela atual. Também faltam controles visuais para alterar status, excluir tickets e executar logout, embora parte dessa lógica já exista.

## 4. Autenticação

1. Cadastro envia `name`, `email` e `password` para `POST /users`.
2. O backend rejeita email já cadastrado e salva a senha com hash bcrypt, custo 10.
3. Cadastro e login retornam usuário e JWT com validade de um dia.
4. A página chama `login(token)` do contexto, que grava o token no estado e no `localStorage`.
5. O interceptador do Axios adiciona `Authorization: Bearer <token>` às requisições.
6. A API valida o JWT antes das operações protegidas.
7. Uma resposta 401 dispara `auth:expired`; o contexto limpa a sessão.

Ao iniciar, o frontend decodifica o token salvo para verificar sua expiração. Essa leitura não verifica a assinatura: a validação efetiva fica no backend. Não há refresh token nem temporizador de expiração durante a sessão; a limpeza acontece ao iniciar ou receber 401.

**Inconsistência atual:** `generateToken` assina `{ id, role }`, mas o tipo global e os controllers de tickets esperam `req.user.sub`. O cast de TypeScript no middleware não transforma `id` em `sub`. Isso pode impedir a criação por falta de `userId` e comprometer o filtro de tickets do usuário. É o primeiro ponto a corrigir na retomada.

## 5. API REST

Base local: `http://localhost:3000`. Nos tickets e em `/auth/me`, envie o header `Authorization: Bearer <token>`.

| Método | Rota | Acesso atual | Entrada / finalidade |
| --- | --- | --- | --- |
| POST | `/users` | Público | `{ name, email, password }`: cadastra usuário e devolve token |
| GET | `/users` | Público | Lista usuários; implementação incompleta, ver pendências |
| POST | `/auth/login` | Público | `{ email, password }`: autentica e devolve token |
| GET | `/auth/me` | Autenticado | Retorna o payload verificado do token, não consulta o perfil no banco |
| POST | `/tickets` | Autenticado | `{ title, description }`: cria ticket vinculado ao usuário |
| GET | `/tickets` | Autenticado | Aceita `page`, `status` e `ticketNumber` como query params |
| PATCH | `/tickets/:id/status` | SUPPORT ou ADMIN | `{ status }`: valida transição e grava histórico |
| DELETE | `/tickets/:id` | ADMIN | Exclui o ticket |

**Atenção:** o `:id` nas rotas de alteração/exclusão é convertido para número e representa `ticketNumber`, não o UUID `id` do banco.

Exemplos:

```http
GET /tickets?page=1&status=OPEN&ticketNumber=12
Authorization: Bearer <token>
```

```http
PATCH /tickets/12/status
Authorization: Bearer <token-de-support-ou-admin>
Content-Type: application/json

{ "status": "IN_PROGRESS" }
```

Respostas de sucesso seguem, em geral, `{ success: true, data, message }`; erros seguem `{ success: false, message }`. A listagem tem um nível adicional:

```json
{
  "success": true,
  "data": {
    "data": [],
    "meta": { "total": 0, "page": 1, "limit": 10, "totalPages": 0 }
  },
  "message": "Listando tickets"
}
```

Por isso a tela lê `response.data.data.data` para obter os tickets. A paginação usa 10 registros por página e ordena pelos mais antigos primeiro. O service pretende limitar `USER` aos próprios tickets; `SUPPORT` e `ADMIN` podem listar todos, sujeito ao problema do identificador descrito acima.

## 6. Banco e regras de negócio

| Entidade | Conteúdo principal |
| --- | --- |
| `User` | UUID, nome, email único, senha com hash, papel e datas |
| `Ticket` | UUID, número único, título, descrição, status, prioridade, usuário e datas |
| `TicketHistory` | Ticket, status anterior, novo status e data |

Um usuário tem vários tickets; cada ticket tem vários registros de histórico. Novos usuários recebem `USER`. Não existe endpoint para promover usuários a `SUPPORT` ou `ADMIN`.

Tickets começam em `OPEN`, com prioridade `MEDIUM`. A criação calcula `ticketNumber` buscando o maior número e somando um. A prioridade não é editável pela API atual.

As transições realmente implementadas em `ticket.service.ts` são:

| Status atual | Próximos estados permitidos |
| --- | --- |
| `OPEN` | `IN_PROGRESS`, `CLOSED`, `RESOLVED` |
| `IN_PROGRESS` | `CLOSED`, `RESOLVED` |
| `RESOLVED` | `OPEN` |
| `CLOSED` | Nenhum |

O README original descreve transições diferentes; esta tabela segue o código. A alteração de status e a criação do histórico acontecem na mesma transação. Ainda não existe endpoint para consultar esse histórico.

Embora o schema declare um enum `Transitions`, o campo `Ticket.status` é `String`; `priority` também é `String`. Portanto esses campos não estão limitados por enums no banco.

## 7. Como rodar e o que conferir antes

Use dois terminais, um para cada aplicação. No PowerShell, se `npm` for bloqueado pela política de scripts, use `npm.cmd` e `npx.cmd`.

Backend:

```powershell
cd backend
npm.cmd install
npx.cmd prisma generate
npm.cmd run dev
```

Frontend:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

A API escuta em `http://localhost:3000`; o frontend usa a URL informada pelo Vite, normalmente `http://localhost:5173`. A URL da API está fixa em `frontend/src/api/api.ts`.

Antes de executar o backend, confira a configuração local de ambiente sem publicar credenciais:

- `JWT_SECRET`: segredo usado para assinar e validar tokens.
- `DIRECT_URL`: URL lida por `backend/prisma.config.ts` para o CLI do Prisma.
- `DATABASE_URL`: configuração de conexão a revisar para o Prisma Client em execução.

O schema está com `url` e `directUrl` comentados, e `database/prisma.ts` apenas instancia `new PrismaClient()`. O carregamento de `dotenv/config` está no arquivo de configuração do CLI, não no ponto de entrada do servidor. A conexão e a disponibilidade das variáveis durante a execução precisam ser verificadas; os comandos acima não garantem que essa configuração esteja pronta.

Para banco novo, revise as migrations antes de aplicá-las: a migration `20260803122937_added_relation_bt_user_and_ticket` usa um UUID fixo para atribuir tickets antigos a um usuário. Isso depende dos dados existentes. Não execute `db push` ou migrations às cegas em um banco que queira preservar.

## 8. Onde você parou: últimas alterações

Datas e descrições abaixo vêm do Git local; a ordem inclui commits de ramos diferentes que foram unidos no último merge.

| Data | Commit | O que mudou |
| --- | --- | --- |
| 14/09/2026 | `d92ee8c` — `mergin` | Merge dos trabalhos dos dois ramos |
| 14/09/2026 | `d3d64ed` — `a` | Integração de cadastro via `RegisterUser`, redirecionamento de `/` para `/login` e remoção de declaração duplicada de `/register` |
| 14/09/2026 | `90603fe` — `link to login` | Link para login na página de cadastro; alteração de formatação no contexto |
| 10/09/2026 | `737caf8` — `fix register` | Ajustes no formulário de cadastro |
| 09/09/2026 | `9296f9a` — `register complete` | Avanços no fluxo de cadastro |
| 09/09/2026 | `3f6625b` — `register kogic` | Lógica de cadastro e ajuste nas rotas de autenticação |
| 01/09/2026 | `8f361e4` — `fix auth validate` | Ajustes na autenticação |
| 01/09/2026 | `6b9a6c7` — `fix createUser` | Ajustes na criação de usuário |

O código resultante do merge usa `CreateUser` no cadastro e chama `login(userResp.token)` para autenticar automaticamente. Existem duas funções de cadastro em `api/register.ts` (`RegisterUser` e `CreateUser`); somente `CreateUser` é usada pela página atual.

**Alteração local que já existia antes desta documentação:** em `frontend/src/pages/CreateTicket/CreateTicket.tsx`, a mensagem de validação mudou de `camos` para `camops`. É apenas texto, ainda com erro de digitação; não há mudança funcional nesse diff. Ela foi preservada. O Git não informa quando uma edição ainda não commitada foi feita.

## 9. Pendências para retomar com clareza

1. **Alinhar o identificador do JWT:** escolher `id` ou `sub` e usar o mesmo nome na geração, nos tipos e nos consumidores. Verificar criação e isolamento de tickets entre usuários.
2. **Revisar conexão e ambiente do backend:** confirmar URLs do Prisma e carregamento de `JWT_SECRET` no processo do servidor.
3. **Proteger a listagem de usuários:** `GET /users` não tem autenticação e usa `findMany` sem `select`, incluindo o hash de senha no retorno se a consulta executar. O controller lê paginação de `req.body`, não de query; o filtro `name` é montado mas não aplicado.
4. **Destravar o build do frontend:** há código e tipos sem uso; ver validação abaixo.
5. **Completar o fluxo na interface:** navegação, logout, filtros, mudança de status, exclusão e dashboard. Tratar também lista vazia e limites da paginação: com zero páginas, o botão Próximo pode continuar habilitado.
6. **Ajustar detalhes da API:** `updateTicketStatus` não retorna o ticket atualizado; o controller recebe `undefined` e o campo `data` é omitido na serialização. Exclusão de ticket com histórico pode falhar pela relação sem exclusão em cascata. A geração de número por maior valor mais um pode colidir em criações simultâneas. Validar paginação e entradas com mais rigor.
7. **Adicionar testes dos fluxos centrais:** login, permissões, isolamento entre usuários e transições de status. O backend ainda tem apenas o script padrão de teste que termina com erro.

### Validação desta revisão

A análise funcional acima veio da leitura do código e do Git. Não foram executadas chamadas à API, conexão ao banco ou migrations. O build do frontend foi tentado com `npm.cmd run build`; falhou na checagem de TypeScript por declarações sem uso. Nenhum código funcional foi modificado nesta revisão.

Uma boa ordem de leitura para voltar ao projeto é: `App.tsx` → `AuthContext.tsx` → `api/api.ts` → `authVerify.ts` → `ticket.routes.ts` → `ticket.controller.ts` → `ticket.service.ts` → `schema.prisma`.
