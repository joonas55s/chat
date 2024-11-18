import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import { InputAcceptInvite } from './input-accept-invite'


export default class AcceptInvite implements UseCase{
    
	constructor(private contactsGateway:IContactsGateway){}

	async handle(input:InputAcceptInvite): Promise<Either<ResponseError, void>> {
		const result = await this.contactsGateway.acceptInvite(input.requester_username,input.targuet_username)
		if (result.isLeft()) return left(result.value)
		return right(undefined)
	}
}