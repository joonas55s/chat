import { faker } from '@faker-js/faker'
import Username from '../../../src/domain/username'

describe('User',()=>{
	test('Deve criar um username valido', ()=>{
		const fakeName = faker.internet.userName()
		const username = new Username(fakeName)
		expect(username.value).toBe(fakeName)
	})

	test('Deve lançar um erro se o username estiver vazio', ()=>{
		const fakeName = ''
		expect(() => new Username(fakeName)).toThrow(new Error('Username must contain at least 4 characters'))
	})
   
})