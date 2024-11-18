import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import {MongoMemoryServer} from 'mongodb-memory-server'
import FindUserByEmail from 'src/aplication/use-case/find-users-by-email/find-user-by-email'

describe('FindUserByEmail',()=>{
	let userRepository: UserRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod:MongoMemoryServer

	beforeAll(async()=>{
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
	})

	afterEach(async () => {
		await (await connection.getCollection('users')).deleteMany()
	})

	afterAll(async () => {
		await (await connection.getCollection('users')).deleteMany()
		await connection.disconnect()
		await mongod.stop()
	})

	test('Deve buscar um usuário pelo email',async ()=>{
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

		const fakeEmail ='fakeEmail@gmail.com'
		const findUser = new FindUserByEmail(userRepository)
		const user = await findUser.handle(fakeEmail)
		expect(user).toBeTruthy()
	})
    
	test('Deve retornar uma mensagem de erro se o usuário não for encontrado',async ()=>{
		const userInputData1 = {
			email: 'fake123@gmail.com',
			password: '18aSx#',
			username: 'fakeUser',
			name: 'fakeName'
		}
		const collection = await connection.getCollection('users')
		await collection.insertMany([
			userInputData1
		])

		const fakeEmail ='fakeEmail@gmail.com'
		const findUser = new FindUserByEmail(userRepository)
		expect(async()=>await findUser.handle(fakeEmail)).rejects.toThrow(new Error('User Not Found'))
	})
})