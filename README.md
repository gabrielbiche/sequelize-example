## The system
Project aimed at studying sequelize with JavaScript ES6, **see Readme-sequelize.md in the project root**.


### Description
The project consists of a basic user CRUD. In it you can register, list, change or remove users.


### Technologies used
RESTful using Node.js, Express, Mysql, Sequelize.


### Architecture
For the creation of the project, the architectural pattern of MVC software was used.


### Directory structure
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
### Postman collection for API consumption at project root

### Follow the steps below to run the project

1. Create a database

2. Rename the project root file called .env.example to .env and in this define a port for the server and its access data to the database

3. Start project dependencies with the following command
```
npm install
```

4. Create the database tables by running the migrations with the following command

```
npx sequelize-cli db:migrate
```

5. OPTIONAL) If you want you can populate the database with the seeds provided, for this run the following command

```
npx sequelize-cli db:seed:all
```

6. Run the following command to start the server
```
npm run dev
```

### Database relational model
![Captura de tela de 2022-09-14 14-48-05](https://user-images.githubusercontent.com/63760217/190226415-18dfdefb-5a5a-4729-a286-e9d64e4ed8a2.png) 
