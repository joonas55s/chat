import 'dotenv/config'
import { makeSocketIo } from './factories/socketio-factory'
import KafkaAdpter from '@infra/queue/kafka/kafka-adpter'
import { makeSaveMessagesQueueConsumerUseCase } from './factories/save-messages-queue'
import ExpressHttpServer from '@infra/http/express/ExpressHttpServer'


const server = new ExpressHttpServer()

const kafkaAdpter = new KafkaAdpter(process.env.CLIENTID,[process.env.BROKERS])
const socket = makeSocketIo(kafkaAdpter)
makeSaveMessagesQueueConsumerUseCase(kafkaAdpter)
socket.start(server.httpServer)

server.httpServer.listen(process.env.PORT, () => {
	console.log('Servidor Socket.IO está ouvindo na porta ' + process.env.PORT)
})