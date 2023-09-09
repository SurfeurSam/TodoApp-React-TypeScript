require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');

// реквайрим МИДЛВЕЙРЫ
const dbCheck = require('./src/middlewares/dbCheck');

// реквайрим РОУТЫ

const todoRoute = require('./src/routes/todo.route')

const app = express();
const PORT = process.env.PORT || 3009;

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true }
));

// НАЧАЛО конфига Куки
const sessionConfig = {
  name: 'MyToDoApp',
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
app.use('/todo', todoRoute);


// РОУТЫ

app.listen(PORT, () => {
  console.log('Server started', PORT);
});
