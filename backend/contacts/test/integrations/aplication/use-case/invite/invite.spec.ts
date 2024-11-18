import { MongoMemoryServer } from 'mongodb-memory-server'
import SendInvite from 'src/aplication/use-case/send-invite/send-invite'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'

describe('Invite', () => {
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let inviteRepositoryMongoDb:InviteRepositoryMongoDb
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let sut: SendInvite
	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		inviteRepositoryMongoDb = new InviteRepositoryMongoDb(connection)
		sut = new SendInvite(userRepository,inviteRepositoryMongoDb)
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	test('Não deve criar um invite se o requester_username não existir', async () => {
		const requester_username = 'fakeUsername'
		const targuet_username = 'fakeUsername2'
		expect(async() => await sut.handle({requester_username, targuet_username})).rejects.toThrow(new Error('requester_username not found'))
	})

	test('Não deve criar um invite se o targuet_username e requester_username forem iguais', async () => {
		const requester_username = 'fakeUser'
		const targuet_username = 'fakeUser'
		expect(async() => await sut.handle({requester_username, targuet_username})).rejects.toThrow(new Error('requester_username and targuet_username must not be equal'))
	})
    
	test('Não deve criar um invite se o targuet_username não existir', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const requester_username = 'fakeUser'
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1
		])
		const targuet_username = 'fakeUsername2'
		expect(async() => await sut.handle({requester_username, targuet_username})).rejects.toThrow(new Error('targuet_username not found'))
	})

	test('Deve criar um invite', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const userInputData2 = {
			email: 'fake2Email@gmail.com',
			password: '18aSx#',
			username: 'fakeUser2',
			name: 'fakeName'
		}

		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
			userInputData2
		])
		const requester_username = 'fakeUser'
		const targuet_username = 'fakeUser2'
		const result = await sut.handle({requester_username, targuet_username})
		expect(result).toBeUndefined()
	})

    
})