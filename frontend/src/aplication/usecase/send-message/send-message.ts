import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { AppSocket } from '@domain/appSocket'
import { AppStorage } from '@domain/appStorage'
import { InputSendMessage } from './input-send-message'

export default class SendMessage implements UseCase {
	constructor(private apStorage:AppStorage, private appSocket:AppSocket){}

	async handle(input:InputSendMessage): Promise<Either<ResponseError, any>> {
		const {username} = this.apStorage.getUser()
		const send_at = new Date()
		const body = { senderUsername:username, recipientUsername:input.recipientUsername, message:input.message, send_at }
		try {
			this.appSocket.emit('messages',body)
			return right(undefined)
		} catch (err){
			return left(new ResponseError('Falha ao enviar mensagem',400))
		}
	}
    
}