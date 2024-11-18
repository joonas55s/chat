export default interface OutputFindUser{
    email: string,
    name: string,
    username: string,
    id: string,
    isAContact: boolean,
    invited:boolean,
    invitePending?: boolean
}