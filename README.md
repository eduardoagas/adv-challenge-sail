# Lista de Tarefas

Aplicação fullstack para manipular tarefas, desenvolvido para o desafio da ADVBOX.

## Tecnologias Utilizadas

Laravel 11 (Sail), PHP, React (Inertia e Typescript), PostgreSQL, Docker.

## Guia de Instalação Local

### Pré-Requisitos

- Docker instalado.
- Composer.
- Recomendação: SO Linux ou integração WSL2

### Instruções

1. Abra o terminal e clone o repositório:

   ```bash
   git clone https://github.com/eduardoagas/adv-challenge-sail.git
   ```

2. Acesse o diretório clonado e rode o comando para instalar as dependências:
```bash
   composer install 
   ```
   parâmetros úteis: --ignore-platform-reqs (sufixo) ; COMPOSER_PROCESS_TIMEOUT=1200 (prefixo)

3. Substitua o arquivo `.env.example` na pasta application ao `.env` usando o comando:
```bash
   cp .env.example .env
   ```

4. Recomendação: defina o alias do sail.
```bash
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```

5. Na pasta da aplicação, inicie os contêineres do Docker:
   ```bash
   sail up -d
   ```

6. Gere uma chave para o .env da aplicação:
```bash
sail artisan key:generate
   ```

7. Atualize o composer se necessário

   ```bash
   sail composer update
   ```

8. instale as dependências do npm

```bash
   sail npm install
   ```
9. Suba a aplicação para ser acessada pelo http:localhost usando

```bash
   sail npm run build
   ```

9. Os testes automatizados podem ser rodados com

```bash
   sail artisan test
   ```

10. Suba a aplicação para ser acessada pelo http:localhost usando

```bash
   npm run build
   ```

### Funcionalidades

O usuário pode fazer login e se registrar pela tela de login.
O usuário pode acessar a lista de tarefas que lhe estão atribuídas clicando na aba tarefas.
O usuário pode criar, editar e marcar como concluídas as tarefas interagindo com a página listar_tarefas.
O usuário pode acessar a descrição detalhada de cada tarefa clicando sobre o nome da mesma.
O usuário pode ordenar por nome, conclusão e por categoria clicando sobre cada representativo
na na tabela.
O usuário pode acessar a lista completa de categorias clicando na aba categorias.
O usuário pode criar, editar e excluir categorias interagindo com a página listar_categorias.
A edição e exclusão de tarefas/categorias competem somente ao usuário criador das mesmas.

