export default class Username {
	constructor(readonly value: string) { 
		if (!this.isValidLength(value)) throw new Error('Username must contain at least 4 characters')
	}

	private isValidLength(username: string) {
		if (username.length < 4) return false
		return true
	}
}