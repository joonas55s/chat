import { UserRepository } from '@domain/repository/users/user-repository'
import { UseCase } from '../use-case'
import OutputFindUserByEmail from './output-find-User-by-email'

export default class FindUserByEmail implements UseCase {

	constructor(private usersRepository: UserRepository) { }

	async handle(email: string): Promise<OutputFindUserByEmail | undefined> {
		const user = await this.usersRepository.findByEmail(email)
		if (!user) throw new Error('User Not Found')
		const output: OutputFindUserByEmail = {
			email: user.email,
			id: user.id,
			name: user.name,
			username: user.username
		}
		return output
	}
}