import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import HttpClient from '../../http/http-client'
import { FindMessagesOutput, IMessagesGateway } from '@domain/gateways/messages/messages-gateway'

export default class MessagesGateway implements IMessagesGateway {
	constructor(readonly httpClient: HttpClient){}

	async find(username: string,contactName:string): Promise<Either<ResponseError, FindMessagesOutput[] | null>> {
		const result = await this.httpClient.get(`api/messagesbycontact?senderUsername=${username}&recipientUsername=${contactName}`)
		if (result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
		return right(result.value)
	}
}