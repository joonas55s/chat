import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import SendInvite from '@aplication/use-case/send-invite/send-invite'
import InviteRepositoryMongoDb from '@infra/repository/invite-repository'


export const makeSendInviteUseCase = () => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const inviteRepository = new InviteRepositoryMongoDb(mongoDbDriveAdpter)
	const usecase = new SendInvite(userRepository,inviteRepository)
	return usecase
}