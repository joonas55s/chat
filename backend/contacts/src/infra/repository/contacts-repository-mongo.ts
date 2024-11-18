import Contacts from '@domain/entities/contacts'
import { ContactsRepository } from '@domain/repository/contacts-repository'
import ConnectionMongoDb from '../connection/connectionMongoDb'

export default class ContactsRepositoryMongo implements ContactsRepository {

	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }

	async find(ownerUsername: string): Promise<Contacts | undefined> {
		const collection = await this.connectionMongoDb.getCollection('contacts')
		const result = await collection.findOne({ ownerUsername: ownerUsername })
		if (!result) return
		const contacts = new Contacts(ownerUsername)
		for (const user of result.contacts){
			contacts.addContact(user)
		}
		return contacts
	}

	async add(ownerUsername: string, contactUsername: string): Promise<void> {
		const collection = await this.connectionMongoDb.getCollection('contacts')
		const result = await collection.findOne({ ownerUsername: ownerUsername })
		if (result){
			await collection.updateOne({ownerUsername: ownerUsername},{
				$addToSet:{
					contacts:contactUsername
				}
			})
		} else {
			await collection.insertOne({
				ownerUsername: ownerUsername,
				contacts:[contactUsername]
			})
		}
	}
}