import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { IMessagesGateway } from '@domain/gateways/messages/messages-gateway'
import { InputGetMessages } from './input-get-messages'
import OutputGetMessages from './output-get-messages'

export default class GetMessages implements UseCase{

	constructor(private messagesGateway:IMessagesGateway){}
    
	async handle(input: InputGetMessages): Promise<Either<ResponseError, OutputGetMessages>> {
		const result = await this.messagesGateway.find(input.username, input.contactName)
		if (result.isRight()){
			const output:OutputGetMessages = {
				contactName: input.contactName,
				messages: []
			}
			if (result.value){
				for (const message of result.value){
					output.messages.push({
						id:message.id,
						message:message.message,
						send_at: message.send_at,
						me:message.me
					})
				}
			}
			return right(output)
		}
		return left(result.value)
	}
    
}