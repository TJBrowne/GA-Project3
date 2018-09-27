const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'villains_db',
  dialect: 'postgres'
});


// Create models here


module.exports = {
  User,
  Character,
  Media,
  sequelize: sequelize
};
