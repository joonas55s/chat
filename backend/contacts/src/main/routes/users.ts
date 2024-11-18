import { Router } from 'express'
import { adaptRoute } from '@infra/http/express/express-route-adapter'
import { makeFindUserByEmailController } from '../factories/find-user-by-email-factory'
import { makeFindUserController } from '../factories/find-users-factory'

export default (router: Router): void => {
	router.get('/user-by-email', adaptRoute(makeFindUserByEmailController()))
	router.get('/users', adaptRoute(makeFindUserController()))
}