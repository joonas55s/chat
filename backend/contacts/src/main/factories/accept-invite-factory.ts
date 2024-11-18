import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { WebController } from '@infra/http/web-controller'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import ContactsRepositoryMongo from '@infra/repository/contacts-repository-mongo'
import AcceptContact from '@aplication/use-case/accept-contact/accept-contact'
import KafkaAdpter from '@infra/queue/kafka/kafka-adpter'
import InviteRepositoryMongoDb from '@infra/repository/invite-repository'
import { AcceptContactController } from '@presentation/controllers/accept-contact'

export const makeAcceptContactController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const kafkaAdpter = new KafkaAdpter(environment.clientId, [environment.brokers])
	const usecase = new AcceptContact(userRepository,inviteRepository,contactsRepository,kafkaAdpter)
	const controller = new WebController(new AcceptContactController(usecase))
	return controller
}