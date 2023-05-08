const mongoose = require('mongoose');
require("dotenv").config();

class Database{
  constructor(){
    this.connection = null;
  }

  connect(){
    const mongo_url = `mongodb+srv://artenks:${process.env.DB_PASSWORD}@arten-bot.tgmb5gx.mongodb.net/arten-bot?retryWrites=true&w=majority`;
    console.log("Fazendo conexão com banco de dados...")
    mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("banco de dados conectado");
      this.connect = mongoose.connection;
    }).catch(err => {
      console.error(err);
    })
  }
}

module.exports = Database;