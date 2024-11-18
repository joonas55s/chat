import { MongoMemoryServer } from 'mongodb-memory-server'
import ListInvites from 'src/aplication/use-case/list-invites/list-invites'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import { HttpRequest } from 'src/infra/http/ports'
import { WebController } from 'src/infra/http/web-controller'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import { ListInviteController } from 'src/presentation/controllers/list-invite'


describe('List-invite controller', () => {
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
		const usecase = new ListInvites(inviteRepository,userRepository)
		sut = new WebController(new ListInviteController(usecase))
	})

	afterEach(async () => {
		await (await connection.getCollection('invites')).deleteMany()
	})

	test('Deve Listar os invites do usuário e retornar status code 200', async () => {
		const collectionUsers = await connection.getCollection('users')
		const userInputData1 = {
			email: 'fakeEmail@gmail.com',
			password: '18aSx#',
			username: 'fakeUser2',
			name: 'fakeName'
		}
		await collectionUsers.insertMany([
			userInputData1
		])
		const collection = await connection.getCollection('invites')
		await collection.insertOne({
			requester_username:'fakeName',
			targuet_username:'fakeUser2',
			accepted:false
		})     
		const input: HttpRequest = { query: { username: 'fakeUser2'} }
		const result = await sut.handle(input)
		expect(result.body).toMatchObject([{
			requester_username:'fakeName',
			targuet_username:'fakeUser2',
		}])
		expect(result.statusCode).toBe(200)
	})

	test('Deve retornar bad request se o usuário não existir', async () => {    
		const input: HttpRequest = { query: { username: 'fakeUsernameX'} }
		const result = await sut.handle(input)
		expect(result.body).toBe('user not found')
		expect(result.statusCode).toBe(400)
	})


})