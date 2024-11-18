import http from 'http'
import ExpressHttpServer from '../infra/http/express/ExpressHttpServer'
import 'dotenv/config'
import { makeInviteConsumerUseCase } from './factories/invite-consumer-factory'

async function main() {
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('Server started')
	})
	makeInviteConsumerUseCase()	
}

main()