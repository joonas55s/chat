
import Message from '@domain/entities/message'
import { UseCase } from '../../use-case'
import { InputSaveMessage } from './input-save-message'
import { MessagesRepository } from '@domain/repository/users/messages-repository'

export default class SaveMessage implements UseCase {

	constructor(private messagesRepository:MessagesRepository){}

	async handle(input: InputSaveMessage): Promise<any> {
		const message = new Message(input.senderUsername,input.recipientUsername,input.message, input.send_at)
		await this.messagesRepository.save(message)
	}
    
}