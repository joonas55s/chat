import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { InputSendInviteContact } from './input-SendInviteContact'
import { Either, left, right } from '@shared/either'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'

export default class SendInviteContact implements UseCase{
	constructor(private contactsGateway:IContactsGateway){}

	async handle(input: InputSendInviteContact): Promise<Either<ResponseError, void>> {
		const result = await this.contactsGateway.invite(input.requester_username,input.targuet_username)
		if (result.isLeft()){ 
			if (result.value.statusCode >= 400 && result.value.statusCode < 500)
				return left(result.value)
			return left(new ResponseError('Falha ao tentar fazer convite.',result.value.statusCode))
		}
		return right(undefined)
	}
}