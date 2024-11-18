import User from '../../domain/entities/user'
import { UserRepository } from '../../domain/repository/users/user-repository'
import Username from '../../domain/username'
import ConnectionMongoDb from '../connection/connectionMongoDb'

export default class UserRepositoryMongo implements UserRepository {

	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

	async findByUserName(username: string): Promise<User | undefined> {
		const collection = await this.connectionMongoDb.getCollection('Accounts')
		const result = await collection.findOne({
			username: username
		})
		if (!result) return 
		const user = new User(result.email, result.name, new Username(result.username),result._id.toString())
		return user
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const collection = await this.connectionMongoDb.getCollection('Accounts')
		const result = await collection.findOne({
			email: email
		})
		if (!result) return
		const user = new User(result.email, result.name, new Username(result.username),result._id.toString())
		return user
	}

}