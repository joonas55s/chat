
export default class Contacts {
	private _userNames: string[] = []
	constructor(readonly ownerUsername:string){}

	public addContact(userName:string){
		this._userNames.push(userName)
	}

	get contacts(){
		return this._userNames
	}
}