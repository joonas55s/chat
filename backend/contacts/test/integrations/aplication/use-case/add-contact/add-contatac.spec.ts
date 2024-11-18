import { MongoMemoryServer } from 'mongodb-memory-server'
import AddContactUseCase from 'src/aplication/use-case/add-contact/add-contact-use-case'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'


describe('AddContactUseCase',()=>{
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod:MongoMemoryServer
	let sut:AddContactUseCase
	beforeAll(async()=>{
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		sut = new AddContactUseCase(userRepository,contactsRepository)
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})
    
	test('Deve adicionar um contato', async ()=>{
		const userInputData1 = {
			email: 'fake123@gmail.com',
			password: '18aSx#',
			username: 'fake_username',
			name: 'fake_username'
		}
		const userInputData2 = {
			email: 'fake4002@gmail.com',
			password: '18aSx#',
			username: 'fake_username2',
			name: 'fake_username2'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
			userInputData2
		])
		const owner = 'fake_username'
		const contact = 'fake_username2'
		const result = await sut.handle({ownerUserName:owner,contactUserName:contact})
		expect(result).toBeFalsy()
	})

	test('Não deve adicionar um contato se o dono do contato não existir', async ()=>{
		const userInputData2 = {
			email: 'fake4002@gmail.com',
			password: '18aSx#',
			username: 'fake_username2',
			name: 'fake_username2'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData2
		])
		const owner = 'fake_username_owner'
		const contact = 'fake_username2'
		expect(async ()=>await sut.handle({ownerUserName:owner,contactUserName:contact})).rejects.toThrow(new Error('Owner not found'))
	})

	test('Não deve adicionar um contato se o usuário não existir', async ()=>{
		const userInputData1 = {
			email: 'fake123@gmail.com',
			password: '18aSx#',
			username: 'fake_username',
			name: 'fake_username'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1,
		])
		const owner = 'fake_username'
		const contact = 'fake_username2'
		expect(async ()=>await sut.handle({ownerUserName:owner,contactUserName:contact})).rejects.toThrow(new Error('Contact not found'))
	})
})