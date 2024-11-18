import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { WebController } from '@infra/http/web-controller'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import ContactsRepositoryMongo from '@infra/repository/contacts-repository-mongo'
import FindContatcs from '@aplication/use-case/find-contacts/find-contacts'
import { FindContactsController } from '@presentation/controllers/find-contacts'

export const makeFindContactController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const usecase = new FindContatcs(userRepository,contactsRepository)
	const controller = new WebController(new FindContactsController(usecase))
	return controller
}