import { Kafka, Producer } from 'kafkajs'
import { Queue } from '../queue'
import { UseCase } from '@aplication/use-case/use-case'

export default class KafkaAdpter implements Queue {
	private _kafka: Kafka
	private producer: Producer

	constructor(private clientId: string, private brokers: string[]) {
		this._kafka = new Kafka({
			clientId: this.clientId,
			brokers: this.brokers
		})
	}

	async publish(queueName: string, data: any): Promise<void> {
		await this.connect()
		await this.producer.send({
			topic: queueName,
			messages: [
				{ value: JSON.stringify(data) }
			],
		})
		await this.disconnect()
	}

	async consumer(queueName: string, callback: UseCase): Promise<void> {
		await this.connect()
		const consumer = this._kafka.consumer({ groupId: 'messages-group' })
		await consumer.subscribe({ topic: queueName, fromBeginning: true })
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				await callback.handle(JSON.parse(message.value.toString()))
			},
		})
	}

	async connect(): Promise<void> {
		this.producer = this._kafka.producer()
		await this.producer.connect()
	}

	async disconnect(): Promise<void> {
		await this.producer.disconnect()
	}
}