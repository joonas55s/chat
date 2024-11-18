import { WebController } from '@infra/http/web-controller'
import SendToQueue from '@aplication/use-case/send-to-queue/send-to-queue'
import KafkaAdpter from '@infra/queue/kafka/kafka-adpter'
import { SendInviteController } from '@presentation/controllers/send-invite'
import { environment } from '../config/config'

export const makeSendInviteToQueueController = (): WebController => {
	const kafkaAdpter = new KafkaAdpter(environment.clientId, [environment.brokers])
	const usecase = new SendToQueue(kafkaAdpter, 'invites')
	const controller = new WebController(new SendInviteController(usecase))
	return controller
}