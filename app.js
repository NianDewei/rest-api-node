require('dotenv').config()
//init serve with express
const Server = require('./config/server-mongo.js')

const mongoDB = new Server()
mongoDB.listen()

