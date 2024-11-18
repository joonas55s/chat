import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { WebController } from '@infra/http/web-controller'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import { FindUsersController } from '@presentation/controllers/find-users'
import FindUsers from '@aplication/use-case/find-users/find-user'
import ContactsRepositoryMongo from '@infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from '@infra/repository/invite-repository'


export const makeFindUserController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const contactsRepository = new ContactsRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new FindUsers(userRepository,contactsRepository,inviteRepository)
	const controller = new WebController(new FindUsersController(usecase))
	return controller
}