//init serve with express
import dotenv from 'dotenv'
import Server from './config/server-mongo.js'
dotenv.config()

const server = new Server()
server.listen()

