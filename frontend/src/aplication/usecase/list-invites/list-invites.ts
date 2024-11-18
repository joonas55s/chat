import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import { invite } from '@domain/entities/invite'


export default class ListInvites implements UseCase{
    
	constructor(private contactsGateway:IContactsGateway){}

	async handle(username:string): Promise<Either<ResponseError, invite[]>> {
		const result = await this.contactsGateway.listInvites(username)
		if (result.isLeft()) return left(result.value)
		return right(result.value)
	}
}