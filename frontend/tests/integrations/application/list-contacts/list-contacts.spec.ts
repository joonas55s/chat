import ListContacts from '@aplication/usecase/list-contacts/ListContacts'
import Contact from '@domain/entities/contact'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { right } from '@shared/either'

describe('ListContacts',()=>{
	test('Deve buscar os contatos do usuário logado',async ()=>{
		const axiosAdapter = new AxiosAdapter('http://localhost:5050/')
		const contactsGateway = new ContactsGateway(axiosAdapter)
		jest.spyOn(contactsGateway,'listContacts').mockResolvedValueOnce(
			Promise.resolve(right([
				new Contact('fakeEmail@fake.com','FakeName','FakeUsername','658545202asdzzzzx',true,true),
				new Contact('fakeEmail2@fake.com','FakeName2','FakeUsername2','xxxxxhhhhheeeee',true,true)
			]))
		)
		const sut = new ListContacts(contactsGateway)
		const result = await sut.handle('')
		expect(result.value).toMatchObject([
			new Contact('fakeEmail@fake.com','FakeName','FakeUsername','658545202asdzzzzx',true,true),
			new Contact('fakeEmail2@fake.com','FakeName2','FakeUsername2','xxxxxhhhhheeeee',true,true)
		])
	})
})