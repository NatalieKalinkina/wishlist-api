require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/wishlist-db' } = process.env;

const app = express();

const auth = require('./middlewares/auth');
const appRouter = require('./routes');

const { createUser, login } = require('./controllers/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use(appRouter);

app.use(() => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use((err, req, res, next) => {
  // if (err.statusCode === SERVER_ERROR) {
  //   res.status(SERVER_ERROR).send({ message: 'Server error' });
  // } else {
    res.status(err.statusCode).send({ message: err.message });
  // }
  next();
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
