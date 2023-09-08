#!/bin/bash
#  Файл выпонняет установку sequelize для postgres, express, ReactSSR

# Для того что бы все сработало:
# 1) chmod +x Express-ReactSSR-sequelize.sh  // файл по умолчанию не исполняемый, перед запуском выполнить эту команду в консоли где расположен файл.
# 2) кидаете его в корень нового проекта.
# 3) Теперь файл можно запускать, введя ./Express-ReactSSR-sequelize.sh в консоли.

npm init -y

echo '{
  "name": "Express-ReactSSR",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js --ignore session --ext js,jsx",
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}' > package.json

npm i sequelize pg pg-hstore dotenv express morgan express-session session-file-store bcrypt @babel/cli @babel/core @babel/preset-react @babel/register @babel/preset-env react react-dom
npm i -D sequelize-cli nodemon
npx create-gitignore node


mkdir -p public/js
mkdir -p public/images
mkdir -p public/css
mkdir -p src/routes
mkdir -p src/middlewares
mkdir -p src/lib


echo "const path = require('path');
require('dotenv').config()
 module.exports = {
 'config': path.resolve('db', 'config' ,'dbconfig.json'),
 'models-path': path.resolve('db', 'models'),
 'seeders-path': path.resolve('db', 'seeders'),
 'migrations-path': path.resolve('db', 'migrations')
 };" > .sequelizerc


npx sequelize init

echo '{
  "development": {
    "use_env_variable": "DEV_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "TEST_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "PROD_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "seederStorage": "sequelize",
  "seederStorageTableName": "SequelizeData"
}' > ./db/config/dbconfig.json


echo "const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

async function checkConnect(req, res, next) {
  try {
    await sequelize.authenticate();
    res.locals.bd = 'БАЗА ПОДКЛЮЧЕНА!';
    console.log('БАЗА ПОДКЛЮЧЕНА!');
    next();
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНАЯ ==>', error);
    res.send(error);
  }
}

module.exports = checkConnect;" > src/middlewares/dbCheck.js 



echo '
DEV_DB_URL=postgres://postgres:postgres@localhost:5432/yellow_pages
PORT=3000
SESSION_SECRET=1234567890qwertyuiop' > .env 

echo '
DEV_DB_URL=postgres://postgres:postgres@localhost:5432/yellow_pages
PORT=3000
SESSION_SECRET=1234567890qwertyuiop' > .env_example

echo "require('dotenv').config();
require('@babel/register');

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');

// рекварим МИДЛВЕЙРЫ
const dbCheck = require('./src/middlewares/dbCheck');

// реквайрим РОУТЫ


const app = express();
const PORT = process.env.PORT || 3000;

// НАЧАЛО конфига Куки
const sessionConfig = {
  name: 'TwitterCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};
app.use(session(sessionConfig)); // Подключаем сессии как middleware.
app.use('/login', (req, res, next) => {
  console.log('session=>', req.session);
  next();
});
// КОНЕЦ конфига Куки

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);

// РОУТЫ

app.listen(PORT, () => {
  console.log('Server started');
});" > app.js

echo '{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": { "node": "14" },
          "modules": false
        }
      ],
      "@babel/preset-react"
    ]
  }' > .babelrc





