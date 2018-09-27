const express = require('express');
const {User, Media, Character} = require('./models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5678;

const app = express();

const jwtSecret = 'abc13225566'

app.use(bodyParser.json());

app.get('/api/characters', async (request, response) => {
  const characters = await Character.findAll({
    limit: 9
  });
  response.json(characters);
});

app.post('/api/register', async (request, response) => {
  if (!request.body.username || !request.body.password) {
    response.status(404).send("json body must include username, password");
    return;
  }
  const existingUser =  await User.findOne({
    where: {
      username: request.body.username
    }
  });
  if (existingUser){
    response.status(409);
    return;
  }
  const encrypted = await bcrypt.hash(request.body.password,12);
  await User.create({
    username: request.body.username,
    passwordDigest: encrypted
  });
  const findId = await User.findOne({
    where: {
      username: request.body.username
    }
  });
  const token = jwt.sign({
    userId: findId.id
  }, jwtSecret);
  response.status(200).json(token);
});

app.get('/api/current-user', async (request, response) => {
  const token = JSON.parse(request.headers['jwt-token']);
  let verification;
  try{
    verification = jwt.verify(token, jwtSecret);
  }catch(e) {
    console.log(e);
  }
  const findId = await User.findOne({
    where: {
      id: verification.userId
    }
  });
  response.status(200).json(findId);
});

app.put('/api/current-user', async (request, response) => {
  const { characterId } = request.body;
  const token = JSON.parse(request.headers['jwt-token']);
  let verification;
  try{ 
    verification = jwt.verify(token, jwtSecret);
  } catch(e) {
    console.log(e);
  }
  const findId = await User.findOne({
    where: {
      id: verification.userId
    }
  });
  findId.characterId = characterId;
  await findId.save();
  response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
