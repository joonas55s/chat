import { Router } from 'express'
import { adaptRoute } from '@infra/http/express/express-route-adapter'
import { makeGetMessagesUseCase } from '../factories/get-messages'

export default (router: Router): void => {
	router.get('/messagesbycontact', adaptRoute(makeGetMessagesUseCase()))  
}