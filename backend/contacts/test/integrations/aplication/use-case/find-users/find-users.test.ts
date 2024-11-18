import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server'
import FindUsers from 'src/aplication/use-case/find-users/find-user'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'

describe('FindUsers', () => {
	let userRepository: UserRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let contactsRepository: ContactsRepositoryMongo
	let sut: FindUsers

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		const inviteRepository = new InviteRepositoryMongoDb(connection)
		sut = new FindUsers(userRepository, contactsRepository, inviteRepository)
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	afterAll(async () => {
		await (await connection.getCollection('users')).deleteMany()
		await connection.disconnect()
		await mongod.stop()
	})

	test('Deve buscar um usuário pelo email', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1
		])

		const input = { identifier: 'fakeUser', ownerUsername: 'fakeownerUsername' }
		const user = await sut.handle(input)
		expect(user.length).toBe(1)
	})

	test('Deve retornar um array vazio se nenhum usuário for encontrado', async () => {
		const input = { identifier: 'bill', ownerUsername: 'fakeownerUsername' }
		const user = await sut.handle(input)
		expect(user.length).toBe(0)
	})

	test('Deve retornar um usuário com isAContact true', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const userInputData2 = {
			email: 'fakeEmail2@gmail.com',
			password: '18aSx#',
			username: 'fakeUser2',
			name: 'fakeName2'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
			userInputData2
		])
		const collectionContacts = await connection.getCollection('contacts')
		const contact = {
			ownerUsername: 'fakeUser',
			contacts: ['fakeUser2']
		}
		await collectionContacts.insertOne(contact)
		const input = { identifier: 'fakeUser2', ownerUsername: 'fakeUser' }
		const user = await sut.handle(input)
		expect(user[0]).toMatchObject({
			isAContact: true
		})
	})
	test('Deve retornar um usuário com hasInvite true', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const userInputData2 = {
			email: 'fakeEmail2@gmail.com',
			password: '18aSx#',
			username: 'fakeUser2',
			name: 'fakeName2'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
			userInputData2
		])
		const collectionInvites = await connection.getCollection('invites')
		const invite =
        {
        	'requester_username': 'fakeUser',
        	'targuet_username': 'fakeUser2',
        	'accepted': false
        }
		await collectionInvites.insertOne(invite)
		const input = { identifier: 'fakeUser2', ownerUsername: 'fakeUser' }
		const user = await sut.handle(input)
		expect(user[0]).toMatchObject({
			invited : true
		})
	})

})