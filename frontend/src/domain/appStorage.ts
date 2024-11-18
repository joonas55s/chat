export interface AppStorage {
    saveUser(user:userStorage):void
    clear():void
    getUser():userStorage
}

export interface userStorage {
    token:string
    name:string
    username:string
    email:string
}