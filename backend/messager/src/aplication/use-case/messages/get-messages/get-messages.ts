import { MessagesRepository } from '../../../../domain/repository/users/messages-repository'
import { UserRepository } from '../../../../domain/repository/users/user-repository'
import { UseCase } from '../../use-case'
import InputGetMessages from './input-get-messages'
import OutputGetMessages from './output-get-messages'


export default class GetMessagesByContact implements UseCase {
	constructor(private messagesRepository:MessagesRepository,private userRepository: UserRepository){}

	public async handle(input:InputGetMessages):Promise<OutputGetMessages[]>{
		await this.isValidSender(input.senderUsername)
		await this.isValidRecipientUsername(input.recipientUsername)
		const messages = await this.messagesRepository.getMessages(input.senderUsername,input.recipientUsername)
		const outputGetMessages:OutputGetMessages[] = []
		for (const message of messages){
			outputGetMessages.push({
				message:message.message,
				send_at:message.send_at,
				me:message.me,
				id:message.id
			})
		}
		return outputGetMessages
	}

	private async isValidSender(senderUsername:string){
		const sender = await this.userRepository.findByUserName(senderUsername)
		if (!sender) throw new Error('Sender not found')
	}
	private async isValidRecipientUsername(senderUsername:string){
		const recipient = await this.userRepository.findByUserName(senderUsername)
		if (!recipient) throw new Error('Recipient not found')
	}
}