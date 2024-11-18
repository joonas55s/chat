import User from '../../entities/user'

export interface UserRepository {
    findByUserName(username:string):Promise<User | undefined>
    findByEmail(email:string):Promise<User | undefined>
    find(identifier:string):Promise<User[] | undefined>
}

