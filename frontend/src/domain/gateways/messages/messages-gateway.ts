import { Either } from '@shared/either'
import ResponseError from '@shared/response-error'

export interface IMessagesGateway {
    find(username: string,contactName: string): Promise<Either<ResponseError, FindMessagesOutput[] | null>>
}

export interface FindMessagesOutput {
    id:string
    message: string
    send_at: Date
    me:boolean
}
