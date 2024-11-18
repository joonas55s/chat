import { Either } from '@shared/either'
import ResponseError from '@shared/response-error'
import Contact from '../../entities/contact'
import { invite } from '@domain/entities/invite'
import { userContact } from '@domain/entities/userContact'

export interface IContactsGateway {
    find(username: string, ownerUsername:string): Promise<Either<ResponseError, Contact[] | null>>
    invite(requester_username: string,targuet_username: string): Promise<Either<ResponseError, void>>
    listInvites(username:string): Promise<Either<ResponseError, invite[]>>
    listContacts(username:string): Promise<Either<ResponseError, userContact[]>>
    acceptInvite(requester_username: string, targuet_username: string): Promise<Either<ResponseError, void>>
}