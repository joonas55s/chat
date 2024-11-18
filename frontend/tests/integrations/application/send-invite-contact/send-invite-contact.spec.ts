import SendInviteContact from '@aplication/usecase/send-invite-contact/send-invite-contact'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

describe('SendInviteContact',()=>{
	test('Deve enviar um convite',async ()=>{
		const axiosAdapter = new AxiosAdapter('http://localhost:5050/')
		const contactsGateway = new ContactsGateway(axiosAdapter)
		jest.spyOn(contactsGateway,'invite').mockResolvedValueOnce(
			Promise.resolve(right(undefined))
		)
		const sut = new SendInviteContact(contactsGateway)
		const input = {
			requester_username: 'fakeUsername',
			targuet_username: 'fakeUsername2'
		}
		const result = await sut.handle(input)
		expect(result.isRight()).toBe(true)
	})

	test('Deve falhar ao enviar um convite e usar a mensagem de erro da propria requisição caso o status codes seja maior ou igual a 400 e menor que 500',async ()=>{
		const axiosAdapter = new AxiosAdapter('http://localhost:5050/')
		const contactsGateway = new ContactsGateway(axiosAdapter)
		jest.spyOn(contactsGateway,'invite').mockResolvedValueOnce(
			left(new ResponseError('fake message',400))
		)
		const sut = new SendInviteContact(contactsGateway)
		const input = {
			requester_username: 'fakeUsername',
			targuet_username: 'fakeUsername2'
		}
		const result = await sut.handle(input)
		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(ResponseError)
		expect(result.value?.message).toBe('fake message.')
		expect(result.value?.statusCode).toBe(400)
	})

	test('Deve falhar ao enviar um convite e usar uma mensagem generia "Falha ao tentar fazer convite." caso o status code for 500',async ()=>{
		const axiosAdapter = new AxiosAdapter('http://localhost:5050/')
		const contactsGateway = new ContactsGateway(axiosAdapter)
		jest.spyOn(contactsGateway,'invite').mockResolvedValueOnce(
			left(new ResponseError('fake message',500))
		)
		const sut = new SendInviteContact(contactsGateway)
		const input = {
			requester_username: 'fakeUsername',
			targuet_username: 'fakeUsername2'
		}
		const result = await sut.handle(input)
		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(ResponseError)
		expect(result.value?.message).toBe('Falha ao tentar fazer convite..')
		expect(result.value?.statusCode).toBe(500)
	})
})