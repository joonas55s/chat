import Contacts from 'src/domain/entities/contacts'
import User from '../../../../src/domain/entities/user'


describe('Contacts', () => {
	test('Deve criar um contato',()=>{
		const user = new User('fakeEmail','fakeName','fakeUsername','fakeId')
		const owner = 'fakeUsernameOwner'
		const contacts = new Contacts(owner)
		contacts.addContact(user.username)
		const contactsList = contacts.contacts
		expect(contactsList.length).toBe(1)
	})
})