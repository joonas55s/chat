import Messenger from '@domain/messenger'
import Message from '../../../../domain/entities/message'
import { MessagesRepository } from '../../../../domain/repository/users/messages-repository'
import { UserRepository } from '../../../../domain/repository/users/user-repository'
import InputSendMessage from './input-send-message'

export default class SendMessage {
	constructor(private messagesRepository:MessagesRepository,private userRepository: UserRepository,private messenger: Messenger){}

	public async exec(input:InputSendMessage):Promise<void>{
		const recipient = await this.userRepository.findByUserName(input.recipientUsername)
		if (!recipient) throw new Error('Recipient user not found')
		const sender = await this.userRepository.findByUserName(input.senderUsername)
		if (!sender) throw new Error('Sender user not found')
		const message = new Message(input.senderUsername,input.recipientUsername,input.message, input.send_at)
		await this.messagesRepository.save(message)
		await this.messenger.deliver(input.senderUsername,input.recipientUsername,input.message,input.send_at)
	}
}