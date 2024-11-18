interface MessagesStorage {
    getMessages(username:string):any[]
    setMessages(username:string,message:any):void
}