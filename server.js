const express = require('express');
const {User, Media, Character} = require('./models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5678;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
