import Contact from '@domain/entities/contact'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { UseCase } from '../use-case'
import InputSearchContacts from './input-find-contact'

export default class SearchContactsUseCase implements UseCase{
	constructor(private contactsGateway:IContactsGateway){}

	async handle(input:InputSearchContacts): Promise<Either<ResponseError, Contact[]>> {
		const contact = await this.contactsGateway.find(input.identifier,input.ownerUsername)
		if (contact.isLeft()) return left(contact.value)
		return right(contact.value ?? [])
	}
    
}