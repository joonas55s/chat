import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import Contact from '@domain/entities/contact'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import HttpClient from '../../http/http-client'
import { invite } from '@domain/entities/invite'
import { userContact } from '@domain/entities/userContact'

export default class ContactsGateway implements IContactsGateway {
	constructor(readonly httpClient: HttpClient){}

	async find(identifier: string,ownerUsername:string): Promise<Either<ResponseError, Contact[]>>{
		const result = await this.httpClient.get(`users?identifier=${identifier}&ownerUsername=${ownerUsername}`)
		if (result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
		const users:Contact[] = []
		if (result.value){
			for (const user of result.value){
				users.push(new Contact(user.email,user.name,user.username,user.id,user.isAContact,user.invited,user.invitePending))
			}
		}
		return right(users)
	}

	async invite(requester_username: string, targuet_username: string): Promise<Either<ResponseError, any>> {
		return await this.httpClient.post('invite',{requester_username,targuet_username})
	}

	async listInvites(username: string): Promise<Either<ResponseError, invite[]>> {
		return await this.httpClient.get(`invites?username=${username}`)
	}

	async listContacts(username: string): Promise<Either<ResponseError, userContact[]>> {
		const result = await this.httpClient.get(`contacts?username=${username}`)
		if (result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
		const users:userContact[] = []
		if (result.isRight()){
			for (const user of result.value){
				users.push({
					id:user.username,
					email:user.email,
					name:user.name,
					username:user.username
				})
			}
		}
		return right(users)
	}

	async acceptInvite(requester_username: string, targuet_username: string): Promise<Either<ResponseError, void>> {
		const result = await this.httpClient.post('accept/invite',{requester_username,targuet_username})
		if (result.isLeft()) return left(new ResponseError(result.value.message,result.value.statusCode))
		return right(undefined)
	}
}