import { MongoMemoryServer } from 'mongodb-memory-server'
import FindContatcs from 'src/aplication/use-case/find-contacts/find-contacts'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'

describe('FindContacts',()=>{
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod:MongoMemoryServer
	let sut:FindContatcs

	beforeAll(async()=>{
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		sut = new FindContatcs(userRepository,contactsRepository)
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
		await (await connection.getCollection('contacts')).deleteMany()
	})

	test('Deve buscar os contatos de um usuário',async ()=>{
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
		const contactsFake = {
			ownerUsername:'fakeUser',
			contacts:['fakeUser1','fakeUser2']
		}
		await collectionContacts.insertOne(contactsFake)
		const input = 'fakeUser'
		const contacts = await sut.handle(input)
		expect(contacts.length).toBe(2)
	})

	test('Deve retornar um array vazio se nenhum contato for encontrado',async ()=>{
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
		])
		const collectionContacts = await connection.getCollection('contacts')
		const contact = {
			ownerUsername:'fakeUser',
			contacts:['fakeUser1','fakeUser2']
		}
		await collectionContacts.insertOne(contact)
		const input = 'fakeUser'
		const contacts = await sut.handle(input)
		expect(contacts.length).toBe(0)
	})

	test('Deve retornar erro se o usuário owner não for encontrado',async ()=>{
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
		const input = 'fakeUserx'
		expect(async()=>await sut.handle(input)).rejects.toThrow(new Error(`User ${input} does not exist`))
	})
})