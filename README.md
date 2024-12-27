# Lista de Tarefas

Aplicação fullstack para manipular tarefas, desenvolvido para o desafio da ADVBOX.

## Tecnologias Utilizadas

Laravel 11 (Sail), PHP, React (Inertia e Typescript), PostgreSQL, Docker.

## Guia de Instalação Local

### Pré-Requisitos

- Docker instalado.
- Recomendação: SO Linux ou integração WSL2

### Instruções

1. Abra o terminal e clone o repositório:

   ```bash
   https://github.com/eduardoagas/adv-challenge-sail.git
   ```

2. Instale o Composer caso necessário

```bash
   curl -sS https://getcomposer.org/installer | php
   ```

3. Rodar o comando para instalar as dependências.
```bash
   php composer.phar install
   ```


2. Substitua o arquivo `.env.example` na pasta application ao `.env`.
```bash
   https://github.com/eduardoagas/adv-challenge-sail.git
   ```

3. No arquivo `.env`, adicione a chave da API do WORDS API:

   ```env
   WORDS_API_KEY=
   ```

4. No terminal, volte ao root do diretório clonado e execute o comando:

   ```bash
   docker compose up --build -d
   ```

5. Ainda no diretório clonado, use o comando abaixo para entrar no terminal do contêiner PHP:

   ```bash
   docker compose exec app bash
   ```

6. No terminal do contêiner, entre na pasta da aplicação Laravel:

   ```bash
   cd application
   ```

7. Execute o comando para instalar as dependências. Caso necessário, adicione o parâmetro `COMPOSER_PROCESS_TIMEOUT=1200`:

   ```bash
   composer install
   ```
8. Execute o comando para gerar as chaves do passport:
    
    ```bash
    php artisan passport:keys
    ```
9. Execute o comando para gerar um personal acess para o passport:

    ```bash
    php artisan passport:client --personal --no-interaction
    ```

10. Execute o comando para importar as palavras:

   ```bash
   php artisan app:importar-palavras
   ```

11. Acesse a documentação na url da [Swagger UI](http://localhost:8000/api/documentation):

```bash
   http://localhost:8000/api/documentation
   ```