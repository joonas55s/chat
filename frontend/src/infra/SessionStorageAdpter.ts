import { AppStorage, userStorage } from '@domain/appStorage'

export default class SessionStorageAdpter implements AppStorage {

	saveUser(user: userStorage): void {
		sessionStorage.setItem('token', user.token)
		sessionStorage.setItem('name', user.name)
		sessionStorage.setItem('username', user.username)
		sessionStorage.setItem('email', user.email)
	}

	clear(): void {
		sessionStorage.clear()
	}

	getUser(): userStorage {
		const token = sessionStorage.getItem('token') || ''
		const name = sessionStorage.getItem('name') || ''
		const username = sessionStorage.getItem('username') || ''
		const email = sessionStorage.getItem('email') || ''
		return {
			token,
			name,
			username,
			email
		}
	}
	
}