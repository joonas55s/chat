import { Router } from 'express'
import { adaptRoute } from '@infra/http/express/express-route-adapter'
import { makeAddContactController } from '../factories/add-contact-factory'
import { makeFindContactController } from '../factories/find-contacts-factory'

export default (router: Router): void => {
	router.post('/addcontact', adaptRoute(makeAddContactController()))
	router.get('/contacts', adaptRoute(makeFindContactController()))  
}