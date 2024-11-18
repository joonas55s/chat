import { Router } from 'express'
import { adaptRoute } from '@infra/http/express/express-route-adapter'
import { makeSendInviteToQueueController } from '../factories/send-invite-to-queue-factory'
import { makeListInviteController } from '../factories/list-invites-factory'
import { makeAcceptContactController } from '../factories/accept-invite-factory'

export default (router: Router): void => {
	router.post('/invite', adaptRoute(makeSendInviteToQueueController()))
	router.post('/accept/invite', adaptRoute(makeAcceptContactController()))
	router.get('/invites', adaptRoute(makeListInviteController()))
}