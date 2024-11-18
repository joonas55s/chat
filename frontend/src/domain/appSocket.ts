export interface AppSocket {
    get socket():any
    connect():void
    disconect():void
    emit(eventname:string, body:any):void
    on(eventname:string,callback:(data:any)=>any):any
}