import { Queue } from '@infra/queue/queue'
import SaveMessage from '@aplication/use-case/messages/save-message/save-message'
import MessagesRepositoryMongoDb from '@infra/repository/messages-repository-mongo'
import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { environment } from '../config/config'


export const makeSaveMessagesQueueConsumerUseCase = async (queue:Queue) => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const messagesRepository = new MessagesRepositoryMongoDb(mongoDbDriveAdpter)
	const saveMessage = new SaveMessage(messagesRepository)
	queue.consumer('messages',saveMessage)
}