# Teste Técnico - Vaga Júnior FullStack

## Descrição do Teste

Desenvolver uma aplicação em Laravel que gerencie um sistema de tarefas (To-Do List).

- **Prazo**: 2 semanas;

---

## Funcionalidades Obrigatórias

1. **Gerenciamento de Tarefas**:
    - Permitir o registro e autenticação de usuários;
    - O usuário pode **criar**, **editar**, **excluir** e **marcar como concluída** uma tarefa.
    - O usuário só pode ver as tarefas atribuidas a ele.

2. **Filtros**:
    - Filtro por categorias;
    - Filtro para exibir somente tarefas concluídas.

3. **CRUD Completo**:
    - Criação de `usuários`;
    - CRUD para `tarefas`;
    - CRUD para `categorias`.

4. **Relacionamentos**:
    - **Um usuário** pode ter **várias tarefas**;
    - Cada tarefa pode pertencer a vários **usuários**;
    - Cada tarefa pode pertencer a **uma categoria**;
    - Cada categoria deve pertencer a um usuário;

---

## Extras

1. **Testes**:
    - Implementar testes automatizados.

2. **Deletar Tarefas Automaticamente**
    - Após **uma semana** marcada como concluída, a tarefa deve ser **excluída automaticamente** do banco de dados
    - Configurar **Job** ou **Command** no Laravel para excluir automaticamente as tarefas concluídas após uma semana (da tarefa finalizada).

---

## Detalhamento do Projeto

### **Requisitos Técnicos**

1. **Backend**
    - Desenvolver utilizando Laravel `11.x`;
    - Validações nos formulários (ex.: título da tarefa obrigatório, e-mail único);
    - Middleware para rotas que exigem autenticação;
    - Pode usar Livewire;
    - Usar as `migrations` do Laravel.

2. **Frontend**
    - Pode usar Blade ou algum framework JS.
    - Interface simples para as funcionalidades listadas.

4. **Documentação**
    - Adicionar um arquivo `README.md` com as seguintes informações:
        - Passos para instalação e execução do projeto.
        - Explicação das principais funcionalidades.
        - Instruções para testar filtros e ações automáticas.

---

## Instruções de Entrega

1. **Repositório Git**:
    - Suba o projeto em um repositório privado no GitHub;
      - Adicione como colaborador o usuário `@combizera` e `@jotahdavid`.
    - Faça commits detalhando seu progresso;

2. **README.md**:
    - Explique como configurar o ambiente de desenvolvimento.
    - Liste as funcionalidades implementadas e como testá-las.

3. **Contato**:
    - Caso surjam dúvidas ou precise de mais prazo, entre em contato através do email `developer@advbox.com.br`.

---

## Critérios de Avaliação

1. **Organização do Código**
    - Estrutura do projeto e clareza na organização dos arquivos.

2. **Qualidade do Código**
    - Uso correto dos recursos do Laravel;
    - Implementação das relações entre entidades.

3. **Funcionalidades**
    - Completação de todos os requisitos obrigatórios.

4. **Documentação**
    - Clareza e estruturação do arquivo `README.md`.

5. **Boas Práticas**
    - Uso de padrões do Laravel;
    - Código limpo e legível.

---

Boa sorte! 😊