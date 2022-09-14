## O sistema
Projeto destinado ao estudo do sequelize com JavaScript ES6, **vide Readme-sequelize.md na raiz do projeto**.


### Descrição
O projeto consiste em um CRUD básico de usuários. Nele tu poderá cadastrar, listar, alterar ou remover usuários.


### Tecnologias utilizadas
RESTful usando Node.js, Express, Mysql, Sequelize.


### Arquitetura
Para a criação do projeto foi utilizado o padrão arquitetural de software MVC.


### Estrutura de diretórios
```
├── /src
|   ├── /controllers
|   ├── /database
|   |   ├── /config
|   |   ├── /migrations
|   |   ├── /seeders
|   ├── /helpers
|   ├── /middleware
|   ├── /models
|   ├── /routes

```

### Coleção Postman para consumo da API na raiz do projeto 

### Siga os passos abaixo para executar o projeto

1. Crie um banco de dados

2. Renomeie o arquivo da raiz do projeto chamado .env.example para .env e neste defina uma porta para o servidor e seus dados de acesso ao banco de dados

3. Inicie as dependências do projeto com o seguinte comando
```
npm install
```

4. Crie as tabelas do banco de dados executando as migrações com o seguinte comando

```
npx sequelize-cli db:migrate
```

5. OPICIONAL) Caso queira você pode popular o banco de dados com as seeds fornecidas, para isto execute o seguinte comando

```
npx sequelize-cli db:seed:all
```

6. Execute o seguinte comando para iniciar o servidor

```
npm run dev 
```

### Modelo relacional do banco de dados
![Captura de tela de 2022-09-14 14-48-05](https://user-images.githubusercontent.com/63760217/190226415-18dfdefb-5a5a-4729-a286-e9d64e4ed8a2.png) 