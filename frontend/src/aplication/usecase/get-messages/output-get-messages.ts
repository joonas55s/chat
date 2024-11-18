export default interface OutputGetMessages {
    contactName:string,
    messages:OutPutMessages[]

}

export interface OutPutMessages {
    id:string
    message: string
    send_at: Date
    me?:boolean
}