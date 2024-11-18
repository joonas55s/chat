import { MongoMemoryServer } from 'mongodb-memory-server'
import FindContatcs from 'src/aplication/use-case/find-contacts/find-contacts'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { HttpRequest } from 'src/infra/http/ports'
import { WebController } from 'src/infra/http/web-controller'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { FindContactsController } from 'src/presentation/controllers/find-contacts'


describe('find-contacts controller', () => {
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let sut: WebController

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		const usecase = new FindContatcs(userRepository, contactsRepository)
		sut = new WebController(new FindContactsController(usecase))
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	test('Deve buscar os contatos de um usuário e retornar statusCode 201', async () => {
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const userInputData2 = {
			email: 'fakexEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser1',
			name: 'fakeName'
		}
		const userInputData3 = {
			email: 'fakeaEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser2',
			name: 'fakeName'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
			userInputData2,
			userInputData3
		])
		const collectionContacts = await connection.getCollection('contacts')
		const contact = {
			ownerUsername: 'fakeUser',
			contacts: ['fakeUser1', 'fakeUser2']
		}
		await collectionContacts.insertOne(contact)
		const input: HttpRequest = {
			query: {
				username: 'fakeUser'
			}
		}
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(200)
		expect(result.body).toMatchObject([
			{ username: 'fakeUser1', email: 'fakexEmail@gmail.com' },
			{ username: 'fakeUser2', email: 'fakeaEmail@gmail.com' }
		])
	})
})