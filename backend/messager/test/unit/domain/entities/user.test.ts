
import { faker } from '@faker-js/faker'
import User from '../../../../src/domain/entities/user'
import Username from '../../../../src/domain/username'

describe('User', () => {
	test('Deve criar um usuário', () => {
		const fakeEmail = faker.internet.email()
		const user = new User(fakeEmail, 'teste', new Username('testeUsername'))
		const userObject = user.getUser()
		expect(userObject).toMatchObject({
			name: 'teste',
			username: 'testeUsername',
			email: fakeEmail,
		})
	})
})