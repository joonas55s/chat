import SignInUseCase from '@aplication/usecase/sign-in/sign-in'
import Account from '@domain/account'
import { AppStorage } from '@domain/appStorage'
import { ISignGateway } from '@domain/gateways/sing/sign-gateway'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import SignGateway from '@infra/gateways/sign/sign-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import HttpClient from '@infra/http/http-client'
import { left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

describe('sign-in',()=>{
	let sut:SignInUseCase
	let signGateway:ISignGateway
	let axiosAdapter: HttpClient
	const sessionStorageAdpter:AppStorage = new SessionStorageAdpter()
	beforeAll(()=>{
		axiosAdapter = new AxiosAdapter('fake url api')
		signGateway = new SignGateway(axiosAdapter)
		sut = new SignInUseCase(signGateway,sessionStorageAdpter)
	})

	test('Deve realizar o login e retornar undefined',async ()=>{
		const account = new Account('fakeusername','fakeName','fakeEmail','fakeToken')
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			Promise.resolve(right(account))
		)
		const result = await sut.handle({email:'fakeEmail',password:'fakePassword'})
		expect(result.isRight()).toBe(true)
		expect(sessionStorageAdpter.getUser()).toMatchObject({
			token: 'fakeToken',
			username: 'fakeusername',
			email: 'fakeEmail',
			name: 'fakeName'
		})

	})

	test('Deve falhar ao realizar login e retornar erro',async ()=>{
		jest.spyOn(axiosAdapter,'post').mockResolvedValueOnce(
			Promise.resolve(left(new ResponseError('fake erro',500)))
		)
		const result = await sut.handle({email:'fakeEmail',password:'fakePassword'})
		expect(result.isLeft()).toBe(true)
	})
})