import AcceptInvite from '@aplication/usecase/accept-invite/accept-invite'
import { IContactsGateway } from '@domain/gateways/contacts/contacts-gateway'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

describe('AcceptInvite',()=>{
	let contactsGateway:IContactsGateway
	let sut:AcceptInvite
	let axiosAdapter:AxiosAdapter
	beforeAll(()=>{
		axiosAdapter = new AxiosAdapter('http://localhost:5050/')
		contactsGateway = new ContactsGateway(axiosAdapter)
		sut = new AcceptInvite(contactsGateway)
	})
    
	test('Deve aceitar um invite',async ()=>{
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			right(undefined)
		)
		const result = await sut.handle({requester_username:'',targuet_username:''})
		expect(result.isRight()).toBe(true)
	})

	test('Deve retornar erro se a requisição for mal sucedida',async ()=>{
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			left(new ResponseError('Algo deu errado', 400))
		)
		const result = await sut.handle({requester_username:'',targuet_username:''})
		expect(result.isLeft()).toBe(true)
	})

})