import { InviteRepository } from '@domain/repository/users/invite-repository'
import { UseCase } from '../use-case'
import { outputListInvites } from './output-list-invites'
import { UserRepository } from '@domain/repository/users/user-repository'

export default class ListInvites implements UseCase {
	constructor(private inviteRepository: InviteRepository,private usersRepository: UserRepository) {}

	async handle(username: string): Promise<outputListInvites[]> {
		const existisUser = await this.usersRepository.findByUserName(username)
		if (!existisUser) throw new Error('user not found')
		const invites = await this.inviteRepository.list(username)
		const output: outputListInvites[] = []
		for (const invite of invites) {
			output.push({
				requester_username: invite.requester_username,
				targuet_username: invite.targuet_username,
				requester_name: invite.requester_name,
				targuet_name:invite.targuet_name
			})
		}
		return output
	}
}
