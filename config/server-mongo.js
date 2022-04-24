import cors from "cors"
import express from "express"
import fileUpload from "express-fileupload"

import { toMongoDB } from "../database/mongodb.js"
// routes
import {
	usersRouter,
	authRouter,
	categorysRouter,
	productsRouter,
	searchsRouter,
	uploadsRouter
} from "../routes/api-v1/index.js"

// clase para configurar el servidor
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.host_name = process.env.HOST_NAME

		this.paths = {
			usersPath: "/api/v1/users",
			authPath: "/api/v1/auth",
			categorysPath: "/api/v1/categorys",
			productsPath: "/api/v1/products",
			searchsPath: "/api/v1/searchs",
			uploadsPath: "/api/v1/uploads",
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
		// File Uploads 
		this.app.use(fileUpload({
			createParentPath: true,
			useTempFiles: true,
			tempFileDir: '/tmp/'
		}))
	}

	routes() {
		// routes
		this.app.use(this.paths.usersPath, usersRouter)
		this.app.use(this.paths.authPath, authRouter)
		this.app.use(this.paths.categorysPath, categorysRouter)
		this.app.use(this.paths.productsPath, productsRouter)
		this.app.use(this.paths.searchsPath, searchsRouter)
		this.app.use(this.paths.uploadsPath, uploadsRouter)
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