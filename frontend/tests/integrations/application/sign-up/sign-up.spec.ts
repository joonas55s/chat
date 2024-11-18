import SingUpUseCase from '@aplication/usecase/sign-up/sign-up'
import { ISignGateway } from '@domain/gateways/sing/sign-gateway'
import SignGateway from '@infra/gateways/sign/sign-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import HttpClient from '@infra/http/http-client'
import { left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

describe('SingUpUseCase',()=>{
	let sut:SingUpUseCase
	let signGateway:ISignGateway
	let axiosAdapter: HttpClient

	beforeAll(()=>{
		axiosAdapter = new AxiosAdapter('fake url api')
		signGateway = new SignGateway(axiosAdapter)
		sut = new SingUpUseCase(signGateway)
	})

	test('Deve realizar o cadastro do usuário e retornar undefined',async ()=>{
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			Promise.resolve(right(undefined))
		)
		const result = await sut.handle({
			username: 'string',
			name: 'string',
			email: 'string',
			password: 'string'
		})
		expect(result.isRight()).toBe(true)
	})

	test('Deve falhar ao cadastrar o usuário e retornar erro',async ()=>{
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			Promise.resolve(left(new ResponseError('fake erro',500)))
		)
		const result = await sut.handle({
			username: 'string',
			name: 'string',
			email: 'string',
			password: 'string'
		})
		expect(result.isLeft()).toBe(true)
	})
})