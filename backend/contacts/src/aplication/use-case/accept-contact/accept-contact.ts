import { ContactsRepository } from '@domain/repository/contacts-repository'
import { InviteRepository } from '@domain/repository/users/invite-repository'
import { UserRepository } from '@domain/repository/users/user-repository'
import { UseCase } from '../use-case'
import { InputAcceptContact } from './input-accept-contact'
import { Queue } from '@infra/queue/queue'

export default class AcceptContact implements UseCase {
	constructor(private userRepository: UserRepository, private inviteRepository: InviteRepository, private contactsRepository: ContactsRepository, private queue: Queue) { }

	async handle(input: InputAcceptContact): Promise<void> {
		const invite = await this.inviteRepository.findOne(input.requester_username, input.targuet_username)
		if (!invite) throw new Error('No invitation found.')
		await this.inviteRepository.accept(invite)
		await this.contactsRepository.add(input.requester_username, input.targuet_username)
		await this.contactsRepository.add(input.targuet_username, input.requester_username)
		const requester = await this.userRepository.findByUserName(input.requester_username)
		const targuet = await this.userRepository.findByUserName(input.targuet_username)
		const notification = {
			requester: requester,
			targuet: targuet
		}
		await this.queue.publish('accepted-invitations', notification)
	}
}