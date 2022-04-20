import cors from "cors"
import express from "express"

import { toMongoDB } from "../database/mongodb.js"
// routes
import { usersRouter } from '../routes/api-v1/User.js'
import { authRouter } from "../routes/api-v1/Auth.js"
import { categorysRouter } from "../routes/api-v1/Category.js"
import { productsRouter } from "../routes/api-v1/Product.js"
import{searchsRouter} from "../routes/api-v1/Search.js"

// clase para configurar el servidor
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.host_name = process.env.HOST_NAME

		this.paths = {
			usersPath: 		"/api/v1/users",
			authPath: 		"/api/v1/auth",
			categorysPath: 	"/api/v1/categorys",
			productsPath: 	"/api/v1/products",
			searchsPath: 	"/api/v1/searchs",
		}

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
		this.app.use(this.paths.usersPath, usersRouter)
		this.app.use(this.paths.authPath, authRouter)
		this.app.use(this.paths.categorysPath, categorysRouter)
		this.app.use(this.paths.productsPath, productsRouter)
		this.app.use(this.paths.searchsPath, searchsRouter)
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`App | Soul Dev | listening on port ${this.port}`),
			console.log(`Link: ${this.host_name}`),
		)
	}
	getHostName() {
		return this.host_name
	}
}

export { Server } //export default Server