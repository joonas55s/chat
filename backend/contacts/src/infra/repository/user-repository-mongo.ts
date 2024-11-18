
import User from '@domain/entities/user'
import { UserRepository } from '@domain/repository/users/user-repository'
import ConnectionMongoDb from '../connection/connectionMongoDb'
export default class UserRepositoryMongo implements UserRepository {

	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

	async find(identifier: string): Promise<User[]> {
		const collection = await this.connectionMongoDb.getCollection('Accounts')
		const result = await collection.find({$or: [ { username: {$regex:`.*${identifier}.*`} }, { email: {$regex:`.*${identifier}.*`} } ]}).limit(15).toArray()
		const users: User[] = []
		for (const user of result) {
			const addUser = new User(user.email, user.name, user.username, user._id.toString())
			users.push(addUser)
		}
		return users
	}

	async findByUserName(username: string): Promise<User | undefined> {
		const collection = await this.connectionMongoDb.getCollection('Accounts')
		const result = await collection.findOne({ username: username })
		if (!result) return
		const user = new User(result.email, result.name, result.username, result._id.toString())
		return user
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const collection = await this.connectionMongoDb.getCollection('Accounts')
		const result = await collection.findOne({ email: email })
		if (!result) return
		const user = new User(result.email, result.name, result.username, result._id.toString())
		return user
	}
}