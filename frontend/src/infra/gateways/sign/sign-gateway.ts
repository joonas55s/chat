import Account from '../../../domain/entities/account'
import { inputSingUp, ISignGateway, singUpOutPut } from '../../../domain/gateways/sing/sign-gateway'
import { Either, left, right } from '../../../shared/either'
import ResponseError from '../../../shared/response-error'
import HttpClient from '../../http/http-client'

export default class SignGateway implements ISignGateway {

	constructor(readonly httpClient: HttpClient) { }

	async singIn(email: string, password: string): Promise<Either<ResponseError, Account>> {
		const result = await this.httpClient.post('/sign-in', { email, password })
		if (result.isLeft()) return left(new ResponseError('Falha ao realizar login',result.value.statusCode))
		return right(new Account(result.value.username, result.value.name, result.value.email, result.value.token))
	}

	async singUp(input: inputSingUp): Promise<Either<ResponseError, singUpOutPut>> {
		const response = await this.httpClient.post('/sign-up', { ...input })
		if (response.isLeft()) return left(response.value)
		return right(response.value)
	}
}