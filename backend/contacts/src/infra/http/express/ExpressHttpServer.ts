import HttpServer from './HttpServer'
import express,{Express} from 'express'
import cors from 'cors'
import setupRoutes from '@main/config/setup-routes'

export default class ExpressHttpServer implements HttpServer {
	app: Express

	constructor () {
		this.app = express()
		this.app.use(express.json())
		this.app.use(cors())
		setupRoutes(this.app)
	}
	
	listen(port: number): any {
		return this.app.listen(port)
	}
}