if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const router = require('./routes/index');

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})