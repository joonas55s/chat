import ConnectionMongoDb from '@infra/connection/connectionMongoDb'
import { WebController } from '@infra/http/web-controller'
import UserRepositoryMongo from '@infra/repository/user-repository-mongo'
import { environment } from '../config/config'
import { FindUserByEmailController } from '@presentation/controllers/find-user-by-email'
import FindUserByEmail from '@aplication/use-case/find-users-by-email/find-user-by-email'

export const makeFindUserByEmailController = (): WebController => {
	const mongoDbDriveAdpter: ConnectionMongoDb = new ConnectionMongoDb(environment.MONGODB_URI,environment.MONGODB_NAME)
	const userRepository = new UserRepositoryMongo(mongoDbDriveAdpter)
	const usecase = new FindUserByEmail(userRepository)
	const controller = new WebController(new FindUserByEmailController(usecase))
	return controller
}