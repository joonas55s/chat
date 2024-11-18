import Invite from '@domain/entities/invite'
import { InviteRepository } from '@domain/repository/users/invite-repository'
import { UserRepository } from '@domain/repository/users/user-repository'
import { UseCase } from '../use-case'
import { inputSendInvite } from './input-send-invite'

export default class SendInvite implements UseCase {

	constructor(private usersRepository: UserRepository, private inviteRepository: InviteRepository) { }

	public async handle(input: inputSendInvite): Promise<void> {
		if (input.requester_username === input.targuet_username) throw new Error('requester_username and targuet_username must not be equal')
		const existisRequester = await this.usersRepository.findByUserName(input.requester_username)
		if (!existisRequester) throw new Error('requester_username not found')
		const existisTarguet = await this.usersRepository.findByUserName(input.targuet_username)
		if (!existisTarguet) throw new Error('targuet_username not found')
		await this.inviteRepository.save(new Invite(input.requester_username,input.targuet_username,existisRequester.name,existisTarguet.name))
	}

}