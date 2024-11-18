import { MongoMemoryServer } from 'mongodb-memory-server'
import AddContactUseCase from '../../../../src/aplication/use-case/add-contact/add-contact-use-case'
import ConnectionMongoDb from '../../../../src/infra/connection/connectionMongoDb'
import { HttpRequest } from '../../../../src/infra/http/ports'
import { WebController } from '../../../../src/infra/http/web-controller'
import ContactsRepositoryMongo from '../../../../src/infra/repository/contacts-repository-mongo'
import UserRepositoryMongo from '../../../../src/infra/repository/user-repository-mongo'
import { AddContactController } from '../../../../src/presentation/controllers/add-contact'

describe('add-contacts controller', () => {
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod:MongoMemoryServer
	let sut:WebController
    
	beforeAll(async()=>{
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		const usecase = new AddContactUseCase(userRepository,contactsRepository)
		sut = new WebController(new AddContactController(usecase))
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	test('Deve adicionar um contato e retonar statusCode 201',async()=>{
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
		const input:HttpRequest = {
			body:{
				'ownerUserName':'fake_username',
				'contactUserName':'fake_username2'
			}
		}
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(201)
	})

	test('Deve falhar ao adicionar um contato inexistente e retornar statusCode 400',async()=>{
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
		const input:HttpRequest = {
			body:{
				'ownerUserName':'fake_username',
				'contactUserName':'fake_username2'
			}
		}
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(400)
		expect(result.body).toBe('Contact not found')   
	})

	test('Deve falhar ao adicionar um contato se o owner da não existir e retornar statusCode 400',async()=>{
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
		const input:HttpRequest = {
			body:{
				'ownerUserName':'fake_username',
				'contactUserName':'fake_username2'
			}
		}
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(400)
		expect(result.body).toBe('Owner not found')   
	})

	test('Deve falhar se os parametros ownerUserName e contactUserName não forem fornecidos',async()=>{
		const input:HttpRequest = {}
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(400)
		expect(result.body).toBe('Missing parameter: ownerUserName, contactUserName.')   
	})
})