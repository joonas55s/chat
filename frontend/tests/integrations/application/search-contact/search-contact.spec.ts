import SearchContactsUseCase from '@aplication/usecase/search-contacts/search-contact'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { left, right } from '@shared/either'
import Contact from '@domain/entities/contact'
import ResponseError from '@shared/response-error'

describe('SearchContactsUseCase',()=>{
	const axiosAdapter = new AxiosAdapter('fake api url')
	const contactsGateway = new ContactsGateway(axiosAdapter)
	let sut:SearchContactsUseCase

	beforeAll(()=>{
		sut = new SearchContactsUseCase(contactsGateway)
	})

	test('Deve buscar contatos a partir da entrada',async()=>{
		jest.spyOn(axiosAdapter,'get').mockResolvedValueOnce(
			Promise.resolve(right([
				new Contact('fakeEmail','fakeName','fakeusername','fakeid',false,true),
				new Contact('fakeEmail','fakeName','fakeusername','fakeid',true,true)
			]))
		)
		const result = await sut.handle({identifier:'fakeusername',ownerUsername:'fakeOwnerUsername'})
		expect(result.isRight()).toBe(true)
		expect(result.value).toMatchObject([
			new Contact('fakeEmail','fakeName','fakeusername','fakeid',false,true),
			new Contact('fakeEmail','fakeName','fakeusername','fakeid',true,true)
		])
	})

	test('Deve buscar contatos a partir da entrada e retornar vazio se nada foi encontrado',async()=>{
		jest.spyOn(axiosAdapter,'get').mockResolvedValueOnce(
			Promise.resolve(right(undefined))
		)
		const result = await sut.handle({identifier:'fakeusername',ownerUsername:'fakeOwnerUsername'})
		expect(result.isRight()).toBe(true)
		expect(result.value).toMatchObject([])
	})

	test('Deve retornar erro se acontecer alguma falha no gateway',async()=>{
		jest.spyOn(axiosAdapter,'get').mockResolvedValueOnce(
			Promise.resolve(left(new ResponseError('fake erro',500)))
		)
		const result = await sut.handle({identifier:'fakeusername',ownerUsername:'fakeOwnerUsername'})
		expect(result.isLeft()).toBe(true)
	})
})