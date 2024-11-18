import { MongoMemoryServer } from 'mongodb-memory-server'
import AcceptContact from 'src/aplication/use-case/accept-contact/accept-contact'
import ConnectionMongoDb from 'src/infra/connection/connectionMongoDb'
import ContactsRepositoryMongo from 'src/infra/repository/contacts-repository-mongo'
import InviteRepositoryMongoDb from 'src/infra/repository/invite-repository'
import UserRepositoryMongo from 'src/infra/repository/user-repository-mongo'
import FakeQueue from '../../../../fakes/fake-queue-adpter'

describe('AcceptContact', () => {
	let inviteRepositoryMongoDb: InviteRepositoryMongoDb
	let contactsRepository: ContactsRepositoryMongo
	let userRepository: UserRepositoryMongo
	let connection: ConnectionMongoDb
	let mongod: MongoMemoryServer
	let fakeQueue: FakeQueue
	let sut: AcceptContact

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		connection = new ConnectionMongoDb(uri, 'chat_api')
		userRepository = new UserRepositoryMongo(connection)
		contactsRepository = new ContactsRepositoryMongo(connection)
		inviteRepositoryMongoDb = new InviteRepositoryMongoDb(connection)
		fakeQueue = new FakeQueue()
		sut = new AcceptContact(userRepository, inviteRepositoryMongoDb, contactsRepository, fakeQueue)
	})

	// afterAll(async () => {
	//     await connection.disconnect()
	//     await mongod.stop()
	// })

	test('Deve aceitar um contato', async () => {
		const invite = {
			'requester_username': 'fakeUsername',
			'targuet_username': 'fakeUsername2',
			'accepted': false
		}
		const collection = await connection.getCollection('invites')
		await collection.insertMany([
			invite,
		])
		const input = {
			requester_username: 'fakeUsername',
			targuet_username: 'fakeUsername2'
		}
		const result = await sut.handle(input)
		expect(result).toBeUndefined()
	})

	test('Não deve aceitar um contato se o invite não for encontrado', async () => {
		const input = {
			requester_username: 'fakeUsername4',
			targuet_username: 'fakeUsername5'
		}
		expect(async () => await sut.handle(input)).rejects.toThrow(new Error('No invitation found.'))
	})
})