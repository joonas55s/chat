import { MongoMemoryServer } from 'mongodb-memory-server'
import FindUsers from 'src/aplication/use-case/find-users/find-user'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { HttpRequest } from 'src/infra/http/ports'
import { WebController } from 'src/infra/http/web-controller'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { FindUsersController } from 'src/presentation/controllers/find-users'


describe('FindUserController', () => {
	let userRepository: UserRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let sut: WebController
	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		const contactsRepository = new ContactsRepositoryMongo(connection)
		const inviteRepository = new InviteRepositoryMongoDb(connection)
		const usecase = new FindUsers(userRepository, contactsRepository, inviteRepository)
		sut = new WebController(new FindUsersController(usecase))
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	test('Deve buscar um usuário encontrar e retornar codigo 200', async () => {
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

		const input: HttpRequest = { query: { identifier: 'fakeUser', ownerUsername: 'fakeownerUsername' } }
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(200)
		expect(result.body[0]).toMatchObject(
			{
				email: 'fakeEmail@gmail.com',
				name: 'fakeName',
				username: 'fakeUser',
				isAContact: false
			}
		)
	})

	test('Deve buscar um usuário não encontrar e retornar codigo 200', async () => {
		const input: HttpRequest = { query: { identifier: 'fakeUser', ownerUsername: 'fakeownerUsername' } }
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(200)
		expect(result.body).toBeTruthy()
	})
})