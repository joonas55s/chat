import HttpServer from './HttpServer'
import express,{Express} from 'express'
import cors from 'cors'
import setupRoutes from '@main/config/setup-routes'
import { createServer } from 'http'

export default class ExpressHttpServer implements HttpServer {
	readonly app: Express
	readonly httpServer
	constructor () {
		this.app = express()
		this.httpServer = createServer(this.app)
		this.app.use(express.json())
		this.app.use(cors())
		setupRoutes(this.app)
	}
	
	listen(port: number): any {
		return this.app.listen(port)
	}
}