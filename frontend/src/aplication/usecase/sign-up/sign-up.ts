import { inputSingUp, ISignGateway, singUpOutPut } from '@domain/gateways/sing/sign-gateway'
import { Either, left, right } from '@shared/either'
import ResponseError from '@shared/response-error'

export default class SingUpUseCase {
	constructor(private signGateway: ISignGateway) { }

	public async handle(input: inputSingUp): Promise<Either<ResponseError, singUpOutPut>> {
		const result = await this.signGateway.singUp(input)
		if (result.isLeft()) return left(result.value)
		return right(result.value)
	}
}