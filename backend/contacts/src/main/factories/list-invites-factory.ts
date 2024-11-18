import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { environment } from '../config/config'
import InviteRepositoryMongoDb from '@infra/repository/invite-repository'
import ListInvites from '@aplication/use-case/list-invites/list-invites'
import { WebController } from '@infra/http/web-controller'
import { ListInviteController } from '@presentation/controllers/list-invite'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'


export const makeListInviteController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const usecase = new ListInvites(inviteRepository,userRepository)
	const controller = new WebController(new ListInviteController(usecase))
	return controller
}