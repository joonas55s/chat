import { UseCase } from '@aplication/use-case/use-case'

export interface Queue {
    connect(): Promise<void>
    publish(queueName: string, data: any): Promise<void>
    consumer(queueName: string, callback: UseCase): Promise<void>
}