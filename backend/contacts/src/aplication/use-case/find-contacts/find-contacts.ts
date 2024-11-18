import User from '@domain/entities/user'
import { ContactsRepository } from '@domain/repository/contacts-repository'
import { UserRepository } from '@domain/repository/users/user-repository'
import { UseCase } from '../use-case'
import { OutputFindContacts } from './output-find-contacts'
export default class FindContatcs implements UseCase {

	constructor(private usersRepository: UserRepository, private contactsRepository: ContactsRepository) { }

	public async handle(username: string): Promise<OutputFindContacts[]> {
		const existOwner = await this.usersRepository.findByUserName(username)
		if (!existOwner) throw new Error(`User ${username} does not exist`)
		const contacts = await this.contactsRepository.find(username)
		const users: User[] = []
		if (contacts?.contacts)
			for (const username of contacts.contacts) {
				const user = await this.usersRepository.findByUserName(username)
				if (!user) continue
				users.push(user)
			}
		const output = this.convertToOutput(users)
		return output
	}

	private convertToOutput(users: User[]): OutputFindContacts[] {
		const output = users.map(user => { return { username: user.username, email: user.email, name:user.name } })
		return output
	}

}