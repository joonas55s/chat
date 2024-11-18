import { UseCase } from 'src/aplication/use-case/use-case'
import { Queue } from 'src/infra/queue/queue'

export default class FakeQueue implements Queue{
	connect(): Promise<void> {
		return
	}
	publish(queueName: string, data: any): Promise<void> {
		return
	}
	consumer(queueName: string, callback: UseCase): Promise<void> {
		return
	}
}