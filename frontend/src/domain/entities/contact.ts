export default class Contact {
	constructor(
        readonly email: string,
        readonly name: string,
        readonly username: string,
        readonly id: string,
        readonly isAContact: boolean,
        readonly invited:boolean,
        readonly invitePending?: boolean
	) {}
}