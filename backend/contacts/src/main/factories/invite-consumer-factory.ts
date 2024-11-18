
import KafkaAdpter from '@infra/queue/kafka/kafka-adpter'
import { environment } from '../config/config'
import { makeSendInviteUseCase } from './send-invite-factory'


export const makeInviteConsumerUseCase = async () => {
	const kafkaAdpter = new KafkaAdpter(environment.clientId, [environment.brokers])
	const sendInviteUseCase = await makeSendInviteUseCase()
	kafkaAdpter.consumer('invites',sendInviteUseCase)
}