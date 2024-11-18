import { userSocket } from '@domain/entities/userSocket'

export interface SocketRepository {
    add(username:string,id:string):Promise<void>
    get(username:string):Promise<userSocket | undefined>
    update(username:string,id:string):Promise<void>
}

