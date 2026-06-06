# Pós Graduação: Fullstack Development

Atividade 2 - API Rest com MongoDB

## Dupla
- Leonardo Dimarchi - 200109
- Luiz Toquetto - 200359

## Endpoints de usuários

- `GET /users` - lista usuários
- `POST /users` - cria usuário
- `GET /users/:id` - busca usuário por id
- `PUT /users/:id` - substitui usuário
- `PATCH /users/:id` - atualiza parcialmente
- `DELETE /users/:id` - remove usuário
- `GET /users/:id/balance` - mostra saldo do usuário

## Endpoints de transações

- `GET /transactions` - lista movimentações
- `POST /transactions` - cria movimentação
- `GET /transactions/:id` - busca movimentação por id
- `PUT /transactions/:id` - substitui movimentação
- `PATCH /transactions/:id` - atualiza parcialmente
- `DELETE /transactions/:id` - remove movimentação

## Imagens de exemplo

### Usuários

![Listar usuários](images/users_get.png)
Listar usuários (GET /users)

![Criar usuário](images/users_post.png)
Criar usuário (POST /users)

![Buscar usuário por id](images/users_get_by_id.png)
Buscar usuário por id (GET /users/:id)

![Substituir usuário](images/users_put.png)
Substituir usuário (PUT /users/:id)

![Atualizar usuário](images/users_patch.png)
Atualizar usuário (PATCH /users/:id)

![Remover usuário](images/users_delete.png)
Remover usuário (DELETE /users/:id)

![Saldo do usuário](images/users_get_balance.png)
Saldo do usuário (GET /users/:id/balance)

### Transações

![Criar transação](images/transactions_post.png)
Criar transação (POST /transactions)

![Criar transação 2](images/transactions_post_2.png)
Criar transação - exemplo adicional

![Listar transações](images/transactions_get.png)
Listar transações (GET /transactions)

![Buscar transação por id](images/transactions_get_by_id.png)
Buscar transação por id (GET /transactions/:id)

![Substituir transação](images/transactions_put.png)
Substituir transação (PUT /transactions/:id)

![Atualizar transação](images/transactions_patch.png)
Atualizar transação (PATCH /transactions/:id)

### Filtros de transações (exemplos de resposta)

![Filtrar por usuário](images/transactions_get_filter_by_userId.png)
Filtrar por usuário (userId)

![Filtrar por tipo](images/transactions_get_filter_by_types.png)
Filtrar por tipo (types)

![Filtrar por categoria](images/transactions_get_filter_by_category.png)
Filtrar por categoria (categories)

![Filtrar por data](images/transactions_get_filter_by_date.png)
Filtrar por intervalo de datas (dateFrom/dateTo)