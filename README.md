# PROJETO TALKER-MANAGER

Este projeto é uma API que interage com o sistema de arquivos utilizando o módulo `fs` para o gerenciamento de palestrantes de um evento. Trata-se de um dos projetos do módulo de back-end do curso de formação em desenvolvimento web full-stack da Trybe.

A aplicação foi desenvolvida em Node.js e permite fazer operações CRUD tendo por objeto as informações presentes no sistema de arquivos.

## Como executar a aplicação usando Docker

Basta rodar os seguintes comandos:

- `docker-compose up -d --build` Para subir o containers de Node.
- `docker exec -it blogs_api bash` Para ter acesso ao terminal interativo do container do Node criado no passo anterior.
- `npm install` Para instalar as dependências do package.json no container do Node.
- `npm start` Para iniciar a aplicação.

## Endpoints da Aplicação

### GET /talker

Recupera todos os palestrantes cadastrados no sistema de arquivos.


### GET /talker/:id

Recupera o palestrante com o id especificado.


### POST /login

Retorna um token aleatório de 16 caracteres que é utilizado nas demais requisições. O corpo da requisição deverá ter o seguinte formato:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```


### POST /talker

Cadastra um novo palestranda no sistema de arquivos. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição. O corpo da requisição deverá ter o seguinte formato:

```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```


### PUT /talker/:id

Edita o palestrante que possui o id indicado pelo route parameter `id`. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição. O corpo da requisição deverá ter o seguinte formato:

```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```


### DELETE /talker/:id

Remove o palestrante com id indicado pelo route parameter `id` do sistema de arquivos. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição.


### GET /talker/search?q=searchTerm

Recupera todos os palestrantes que possuam, em seu campo `name`, o termo especificado pelo query parameter `q`. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição.


### GET /talker/search?rate=rateNumber

Recupera todos os palestrantes que possuam, em seu campo `rate`, valor igual ao query parameter `rate`. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição.


### GET /talker/search?date=watchedDate

Recupera todos os palestrantes que possuam, em seu campo `watchedAt`, valor igual ao query parameter `date`. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição.


### PATCH /talker/rate/:id

Modifica o campo `rate` do palestrante com `id` indicado pelo route parameter `id`. É necessário um token de 16 caracteres no campo `Authorization` do cabeçalho da requisição. O corpo da requisição deve ter o seguinte formato:

```json
{
  "rate": 5
}
```
