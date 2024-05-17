const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/wishlist-db' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
