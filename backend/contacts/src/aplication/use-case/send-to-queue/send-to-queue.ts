import { Queue } from '@infra/queue/queue'
import { UseCase } from '../use-case'

export default class SendToQueue implements UseCase{
	constructor(private queue:Queue, private queueName:string){}

	async handle(request: any): Promise<any> {
		await this.queue.publish(this.queueName,request)
	}
}