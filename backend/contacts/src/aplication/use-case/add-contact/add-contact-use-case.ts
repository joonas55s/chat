
import { ContactsRepository } from '@domain/repository/contacts-repository'
import { UserRepository } from '@domain/repository/users/user-repository'
import { UseCase } from '../use-case'
import { InputAddContactUseCase } from './input-add-contact-use-case'

export default class AddContactUseCase implements UseCase {

	constructor(private usersRepository: UserRepository, private contactsRepository: ContactsRepository) { }

	async handle(request: InputAddContactUseCase): Promise<void> {
		const existisOwner = await this.usersRepository.findByUserName(request.ownerUserName)
		if (!existisOwner) throw new Error('Owner not found')
		const existisContact = await this.usersRepository.findByUserName(request.contactUserName)
		if (!existisContact) throw new Error('Contact not found')
		await this.contactsRepository.add(request.ownerUserName,request.contactUserName)
	}
}