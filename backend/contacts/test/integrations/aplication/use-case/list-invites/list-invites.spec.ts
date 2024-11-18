import { MongoMemoryServer } from 'mongodb-memory-server'
import ListInvites from 'src/aplication/use-case/list-invites/list-invites'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'

describe('ListInvites',()=>{
	let userRepository: UserRepositoryMongo
	let contactsRepository: ContactsRepositoryMongo
	let inviteRepositoryMongoDb:InviteRepositoryMongoDb
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let sut:ListInvites 

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		inviteRepositoryMongoDb = new InviteRepositoryMongoDb(connection)
		sut = new ListInvites(inviteRepositoryMongoDb,userRepository)
	})

	afterEach(async () => {
		await (await connection.getCollection('invites')).deleteMany()
	})

	test('Deve Listar os invites do usuário',async ()=>{
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
		const result = await sut.handle('fakeUser2')
		expect(result).toMatchObject([{
			requester_username:'fakeName',
			targuet_username:'fakeUser2',
		}])
	})
	test('Deve Listar os invites do usuário e se não tiver nenhum deve retornar um array vazio',async ()=>{ 
		const result = await sut.handle('fakeUser2')
		expect(result).toMatchObject([])
	})
})