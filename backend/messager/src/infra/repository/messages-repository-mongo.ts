import Message from '../../domain/entities/message'
import { MessagesRepository } from '../../domain/repository/users/messages-repository'
import ConnectionMongoDb from '../connection/connectionMongoDb'

export default class MessagesRepositoryMongoDb implements MessagesRepository {

	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }
    
	async save(message:Message): Promise<void>{
		const collection = await this.connectionMongoDb.getCollection('messages')
		await collection.insertOne({
			senderId:message.senderId,
			recipientId:message.recipientId,
			message:message.message,
			send_at: new Date()
		})
	}

	async getMessages(senderId: string, recipientId: string): Promise<Message[]>{
		const collection = await this.connectionMongoDb.getCollection('messages')

		const messages = await collection.aggregate([
			{
				$match: {
					$or: [
						{ senderId: senderId, recipientId: recipientId},
						{ senderId: recipientId, recipientId: senderId },
					]
				}
			},
			{
				$addFields: {
					me: {
						$cond: {
							if: { $eq: ['$senderId', senderId] },
							then: true,
							else: false
						}
					}
				}
			}
		
		]).toArray()
		const messagesArray:Message[] = []
		for (const message of messages){
			messagesArray.push(new Message(message.senderId,message.recipientId,message.message,message.send_at,message._id,message.me))
		}
		return messagesArray
	}
}