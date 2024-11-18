import Username from '../username'

export default class User {
	constructor(readonly email: string,readonly name: string,readonly username: Username,readonly id?:string) {
	}

	public getUser() {
		const user = {
			name:this.name,
			username:this.username.value,
			email:this.email,
			id: this.id
		}
		return user
	}
}