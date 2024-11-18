import MessagesRepositoryMongoDb from '@infra/repository/messages-repository-mongo'
import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { environment } from '../config/config'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import GetMessages from '@aplication/use-case/messages/get-messages/get-messages'
import { WebController } from '@infra/http/web-controller'
import { MessagesController } from '@presentation/messages'


export const makeGetMessagesUseCase = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const messagesRepository = new MessagesRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new GetMessages(messagesRepository,userRepository)
	const controller = new WebController(new MessagesController(usecase))
	return controller
}