import { MongoMemoryServer } from 'mongodb-memory-server'
import SendInvite from 'src/aplication/use-case/send-invite/send-invite'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { HttpRequest } from 'src/infra/http/ports'
import { WebController } from 'src/infra/http/web-controller'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { SendInviteController } from 'src/presentation/controllers/send-invite'


describe('send-invite controller', () => {
	let userRepository: UserRepositoryMongo
	let inviteRepository: InviteRepositoryMongoDb
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let sut: WebController

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		inviteRepository = new InviteRepositoryMongoDb(connection)
		const usecase = new SendInvite(userRepository, inviteRepository)
		sut = new WebController(new SendInviteController(usecase))
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	test('Deve fazer um invite e retornar status code 200', async () => {
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
		const input: HttpRequest = { body: { requester_username: 'fakeUser', targuet_username:'fakeUser2'} }
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(200)
	})

	test('Não deve fazer um invite e retornar statusCode 400', async () => {
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
		const input: HttpRequest = { body: { requester_username: 'fakeUser', targuet_username:'fakeUser2'} }
		const result = await sut.handle(input)
		expect(result.statusCode).toBe(400)
	})

})