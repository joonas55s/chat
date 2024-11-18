import { ISignGateway } from '@domain/gateways/sing/sign-gateway'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'
import { InputSignIn } from './input-sign-in'
import { AppStorage } from '@domain/appStorage'

export default class SignInUseCase {

	constructor(private signGateway: ISignGateway, private appStorage: AppStorage) { }

	async handle(input: InputSignIn): Promise<Either<ResponseError, void>> {
		const account = await this.signGateway.singIn(input.email, input.password)
		if (account.isLeft()) return left(account.value)
		this.appStorage.saveUser({
			token: account.value.token,
			username: account.value.username,
			email: account.value.email,
			name: account.value.name
		})
		return right(undefined)
	}
}