import Invite from '@domain/entities/invite'
import { InviteRepository } from '@domain/repository/users/invite-repository'
import ConnectionMongoDb from '../connection/connectionMongoDb'

export default class InviteRepositoryMongoDb implements InviteRepository{
    
	constructor(readonly connectionMongoDb: ConnectionMongoDb) { }


	async find(requester_username: string): Promise<Invite[]> {
		const collection = await this.connectionMongoDb.getCollection('invites')
		const invitesDocuments = await collection.find({requester_username:requester_username}).toArray()
		const invites:Invite[] = []
		for (const invite of invitesDocuments){
			invites.push(new Invite(invite.requester_username,invite.targuet_username,invite.accepted,invite._id.toString()))
		}
		return invites
	}

	async findOne(requester_username: string, targuet_username: string): Promise<Invite | undefined> {
		const collection = await this.connectionMongoDb.getCollection('invites')
		const invitesDocuments = await collection.findOne({requester_username:requester_username,targuet_username:targuet_username})
		if (!invitesDocuments) return
		return new Invite(invitesDocuments.requester_username,invitesDocuments.targuet_username,invitesDocuments.accepted,invitesDocuments._id.toString())
	}

	public async save(invite:Invite):Promise<void>{
		const collection = await this.connectionMongoDb.getCollection('invites')
		await collection.insertOne({
			requester_username:invite.requester_username,
			targuet_username:invite.targuet_username,
			requester_name:invite.requester_name,
			targuet_name:invite.targuet_name,
			accepted:invite.accepted
		})  
	}
    
	public async accept(invite:Invite):Promise<void>{
		const collection = await this.connectionMongoDb.getCollection('invites')
		await collection.deleteOne({
			requester_username:invite.requester_username,
			targuet_username:invite.targuet_username
		})
	}

	public async list(username: string): Promise<Invite[]> {
		const collection = await this.connectionMongoDb.getCollection('invites')
		const invitesDocuments = await collection.find({targuet_username:username, accepted:false}).toArray()
		const invites:Invite[] = []
		for (const invite of invitesDocuments){
			invites.push(new Invite(invite.requester_username,invite.targuet_username,invite.requester_name,invite.targuet_name,invite.accepted,invite._id.toString()))
		}
		return invites
	}

}