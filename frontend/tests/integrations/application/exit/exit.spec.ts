import Exit from '@aplication/usecase/exit/exit'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'

describe('Exit',()=>{
	test('Deve deslogar o usuário',async()=>{
		const sessionStorageAdpter = new SessionStorageAdpter()
		sessionStorageAdpter.saveUser({
			email:'fake@email.com',
			name: 'fakename',
			token: 'faketoken',
			username: 'fakeUsername'
		})
		const sut = new Exit(sessionStorageAdpter)
		const result = await sut.handle(()=>{console.log('fake callback')})
		expect(result.value).toBeUndefined()
	})
})