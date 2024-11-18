import ListInvites from '@aplication/usecase/list-invites/list-invites'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

describe('ListInvites',()=>{
	const axiosAdapter = new AxiosAdapter('fake api url')
	const contactsGateway = new ContactsGateway(axiosAdapter)
	let sut:ListInvites
    
	beforeAll(()=>{
		sut = new ListInvites(contactsGateway)
	})

	test('Deve listar os invites do usuário',async()=>{
		jest.spyOn(axiosAdapter,'get').mockResolvedValueOnce(
			Promise.resolve(right([
				{
					requester_username:'fakeUsername',
					targuet_username:'fakeUsername',
					requester_name: 'fakeName',
					targuet_name: 'fakeName'
				}
			]))
		)
		const result = await sut.handle('fakeUsername')
		expect(result.isRight()).toBe(true)
		expect(result.value).toMatchObject([
			{
				requester_username:'fakeUsername',
				targuet_username:'fakeUsername',
				requester_name: 'fakeName',
				targuet_name: 'fakeName'
			}
		])
	})

	test('Deve retonar erro se a requisição não der certo',async()=>{
		jest.spyOn(axiosAdapter,'get').mockResolvedValueOnce(
			left(new ResponseError('Algo deu errado', 400))
		)
		const result = await sut.handle('fakeUsername')
		expect(result.isLeft()).toBe(true)
	})
})