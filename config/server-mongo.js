import cors from "cors"
import express from "express"
import { usersRouter } from '../routes/api-v1/User.js'
import {toMongoDB} from "../database/mongodb.js"
import { authRouter } from "../routes/api-v1/Auth.js"

// clase para configurar el servidor
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.usersPath = '/api/v1/users'
		this.authPath = '/api/v1/auth'

		//connect to database
		this.connectDB()
		//Middlewares
		this.middlewares()
		//routes of my app
		this.routes()
	}

	async connectDB() {
		await toMongoDB()
	}

	middlewares() {
		// use cors
		this.app.use(cors())
		// Read body of request
		this.app.use(express.json())
		//dirname public
		this.app.use(express.static('public'))
	}

	routes() {
		this.app.use(this.usersPath, usersRouter)
		this.app.use(this.authPath, authRouter)
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`App | Soul Dev | listening on port ${this.port}`)
		)
	}
}

export { Server } //export default Server