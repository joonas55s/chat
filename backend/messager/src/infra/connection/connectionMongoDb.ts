import { MongoClient } from 'mongodb'

export default class ConnectionMongoDb {
	private client: MongoClient

	constructor(url: string, private dbname: string) {
		this.client = new MongoClient(url)
	}

	private async connect() {
		await this.client.connect()
		return this.client.db(this.dbname)
	}

	async disconnect() {
		await this.client.close()
	}

	async getCollection(collectionName: string) {
		const connection = await this.connect()
		const collection = connection.collection(collectionName)
		return collection
	}
}