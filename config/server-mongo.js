import cors from "cors"
import express from "express"
import usersRouter from '../app/routes/api-v1/User.js'

// clase para configurar el servidor
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.usersPath = '/api/v1/users'

		//Middlewares
		this.middlewares()
		//routes of my app
		this.routes()
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
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`Example app listening on port ${this.port}`)
		)
	}
}

export default Server //export default Server