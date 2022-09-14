# Sequelize e JavaScript ES6
## Este documento pretende amparar os seguintes tópicos
- Utilização do Sequelize com JavaScript ES6;
- Instalação do Sequelize e Sequelize-cli;
- Criação do boilerplate, arquivo de configuração (.sequelizerc) e models;
- Realização de migrações.
- Utilização de seeds. 


**Observação**

_Para exemplificar a utilização do Sequelize com JavaScript ES6 será necessário abordar igualmente a instalação do Babel e bibliotecas complementares a configuração do ambiente como um todo. Sendo assim pretendo abordar tais bibliotecas complementares o mínimo possível, como a finalidade de não nos dispersarmos do assunto principal._


## Sumário
- Bibliotecas necessárias
- 1° Passo - Criar arquivo .sequelizerc
- 2° Passo - Criar arquivo .babelrc
- 3° Passo - Definir scripts de execução
- 4° Passo - Criar boilerplate
- 5° Passo - Refatorar arquivos gerados na inicialização do sequelize-cli para JavaScript ES6
- 6° Passo - Criar modelo e migração 
- 7° Passo -  Refatorar arquivos gerados na criação do modelo para JavaScript ES6
- 8° Passo - Implementar modelos e migrações
- 9° Passo - Criar sementes
- 10° Passo - Refatorar arquivos gerados na criação das sementes para JavaScript ES6
- 11° Passo - Implementar as sementes

---

## Bibliotecas necessárias
**Sequelize**
```
npm install --save sequelize
npm install --save-dev sequelize-cli
```
**Babel**
```
npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env @babel/register
```
**Path**
```
npm install --save path
```


## 1° Passo - Criar arquivo .sequelizerc
Devemos inicialmente criar na raiz do projeto o arquivo de configuração do sequelize-cli de nome .sequelizerc. Este arquivo irá indicar o caminho do arquivo de configuração do banco de dados assim como o caminho de onde devem ser gerados e mapeados os arquivos dos modelos, sementes e migrações. Neste modelo de configuração é indicado que o caminho para o arquivo de configuração do banco de dados está em src/database/config e o arquivo em questão é config.js, ainda é definido o caminho para os modelos em src/models, e para as sementes e migrações em src/database. Ressalto que não é necessário criar tais diretórios ou arquivos pois estes serão gerados automaticamente.

_Observações: Mesmo para utilização do ES6 com Sequelize este arquivo em questão deve ser escrito em ES5._

```
require("@babel/register");
const path = require('path');

module.exports = {
  config: path.resolve('./src/database/config', 'config.js'),
  'models-path': path.resolve('./src/models'),
  'seeders-path': path.resolve('./src/database/seeders'),
  'migrations-path': path.resolve('./src/database/migrations'),
};
```


## 2° Passo - Criar arquivo .babelrc

Devemos criar também o arquivo de configuração do babel na raiz do projeto de nome .babelrc.

```
{
  	"presets": [
		["@babel/preset-env"]
	]
}
```


## 3° Passo - Definir scripts de execução
Com as bibliotecas necessárias instaladas e com o ambiente configurado para execução de JavaScript ES6, podemos definir os scripts para build e execução do projeto, em package.json. Estes scripts não são obrigatórios mas facilitam a utilização do babel.

_Observações: Caso esteja utilizando alguma biblioteca para recarregamento automático após mudanças nos arquivos(como o nodemon), adicione o nome da mesma como primeiro argumento do comando abaixo de nome dev._

```
"scripts": {
    "dev": "src/index.js --exec babel-node",
    "build": "rm -rf build && mkdir build && babel src -s -d build",
    "start": "node build/index.js"
  },
```

Feito estas definições a execução do projeto partir de agora de dá da seguinte forma.

Execução em modo de desenvolvimento

```
npm run dev
```

Buid do projeto

```
npm run build
```

Execução em modo de produção

```
npm run start
```

_Observações: Para executar o projeto em modo de produção é necessário antes realizar o build do projeto._


## 4° Passo - Criar boilerplate
Inicialize o sequelize-cli

```
npx sequelize-cli init
```

Ao realizar o comando acima será gerado automaticamente os diretórios e arquivos nos respectivos caminhos indicados em .sequelizerc.


## 5° Passo - Refatorar arquivos gerados na inicialização do sequelize-cli para JavaScript ES6

Ao realizarmos o passo 4, foi gerado dois arquivos em ES5 e como pretendemos utualizar o ES6 precisamos refatorados tais arquivos. Estes arquivos são o index.js de src/models e o config.js de src/database/config.

- Em src/models/index.js
Precisamos alterar os imports, exports e adicionar a importação explícita do arquivo de configuração(vide abaixo o import de nome enVariables). 

Ficando o arquivo da seguinte forma
```
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import enVariables from '../database/config/config.js';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = enVariables[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

```

- Em src/database/config/config.js
Precisamos alterar a estrutura do arquivo que por padrão vem como Json para JavaScript e definir os dados de acesso ao banco de dados. Realizo esta alteração de tipo de arquivo pois em Json não é possível trabalhar com variáveis de ambiente.

_Observações: Mesmo para utilização do ES6 com Sequelize este 
arquivo em questão deve ser escrito em ES5._

Ficando o arquivo da seguinte forma

```
module.exports = {
  development: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: '',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: '',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: '',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
```


## 6° Passo - Criar modelo e migração 

Com o banco de dados configurado e definida a estrutura de diretórios dos modelos e migrações podemos então criar estes com o seguinte comando.

```
npx sequelize-cli model:create --name NAME_MODEL --attributes ATTRIBUTE:TYPE
```

Onde NAME_MODEL deve ser substituído por o nome do modelo e ATTRIBUTES:TYPE deve ser substituído por a(s) propriedade(s) e tipo(s) do modelo que pretendemos criar.  

Por exemplo, caso pretendamos criar o modelo e migração de Usuários com as propriedades: nome, email, senha, idade, estado e cidade, o comando seria o seguinte.
 ```
npx sequelize-cli model:create --name Users --attributes name:string,email:string,password:string,age:integer,state:string,city:string
```

_Mais tipos de atributos podem ser encontrados na_ [**Documentação oficial do Sequelize**](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types).


## 7° Passo -  Refatorar arquivos gerados na criação do modelo para JavaScript ES6

Ao realizarmos o passo 6 e criarmos o modelo de Usuários(o exemplo), foi gerado dois arquivos em ES5 e como pretendemos utilizar o ES6 precisamos refatorados tais arquivos. Estes arquivos são o users.js de src/models e o ...create-users.js de src/database/migrations.


_Observações: o Sequelize proporciona um série de validações que podemos aplicar em nosso modelos, disponíveis em_ [**Documentação oficial do Sequelize**](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators).

- Em src/models/users.js
Precisamos alterar os imports e exports.

Ficando o arquivo da seguinte forma

```
"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

```

- Em src/database/migrations/...create-users.js
Precisamos alterar os imports e exports.

_Observações: Foi adicionado no seguinte arquivo em createdAt e updatedAt a valor padrão do momento de criação e do momento de atualização respectivamente._

Ficando o arquivo da seguinte forma

```
"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    createdAt: {
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Users");
}

```


## 8° Passo - Implementar modelos e migrações

Quando realizamos o passo 7, geramos os arquivos de modelo e migrações porém ainda precisamos "rodar" essas migrações para que seja criado a tabela em nosso banco de dados, realizamos isso com o seguinte comando.

```
npx sequelize-cli db:migrate
```  

Será criado no banco então as seguintes tabelas, onde a tabela SequelizeMeta foi gerado automaticamente pelo Sequelize para gerenciamento das tabelas e a tabela Users é a que definimos no passo 7.

![Captura de tela de 2022-09-14 11-42-15](https://user-images.githubusercontent.com/63760217/190218189-cb29e0c6-b9d5-4e97-9b8a-802377c17fad.png)

### Caso precisemos desfazer a implementação das Migrations rodamos o seguinte comando

```
npx sequelize-cli db:migrate:undo:all
```


## 9° Passo - Criar sementes

Com a tabela do banco de dados criada e os modelos definidos podemos então, caso necessário, criar as sementes para popular o banco, podemos criar as sementes como o seguinte comando.

```
npx sequelize-cli seed:generate --name demo-NAME_SEEDS
```

Onde NAME_SEEDS deve ser substituído pelo nome da semente.

Por exemplo, caso pretendamos criar as sementes de usuários, o comando seria o seguinte.

```
npx sequelize-cli seed:generate --name demo-users
```

_Observações: O comando apenas cria o arquivo das sementes, devemos popular o arquivo para então persistir este no banco de dados._


## 10° Passo - Refatorar arquivos gerados na criação das sementes para JavaScript ES6

Ao realizarmos o passo 9 e criarmos a semente de Usuários, foi gerado o arquivo em ES5 e como pretendemos utilizar o ES6 precisamos refatorar tal arquivo. Este arquivo é o ...demo-users.js de src/database/seeders.

_Observações: Com a finalidade de exemplificar o devido preenchimento do arquivo das sementes, segue a seguir além da refatoração para ES6 o preenchimento de dois usuários, o quais serão persistidos no banco de dados ao implementarmos as sementes._

- Em src/database/seeders/...create-users.js
Precisamos alterar os imports e exports.

Ficando o arquivo da seguinte forma

```
"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "Ciclano",
        email: "ciclano@email.com",
        password: "1234567",
        age: 18,
        state: "São Paulo",
        city: "São Paulo",
      },
      {
        name: "Beltrano",
        email: "beltrano@email.com",
        password: "1234567",
        age: 18,
        state: "São Paulo",
        city: "São Paulo",
      },
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}
```


## 11° Passo - Implementar as sementes

Quando realizamos o passo 10, geramos o arquivo de sementes porém ainda precisamos "rodar" essas sementes que seja populado a tabela em nosso banco de dados, realizamos isso com o seguinte comando.

```
npx sequelize-cli db:seed:all
```

Será criado no banco então os seguintes registros

![Captura de tela de 2022-09-14 13-32-05](https://user-images.githubusercontent.com/63760217/190218468-47a58173-4d59-4377-af2a-9de28b6144bf.png)

### Caso precisemos desfazer a implementação das sementes rodamos o seguinte comando

```
npx sequelize-cli db:seed:undo:all
```
