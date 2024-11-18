import { UseCase } from '../../aplication/use-case/use-case'
import { ControllerOperation, HttpRequest, HttpResponse } from '../../infra/http/ports'
import { badRequest, ok } from '../../infra/http/util'

export class FindUserByEmailController implements ControllerOperation {
	readonly requiredParams: string[] = ['email']
	private useCase: UseCase

	constructor(useCase: UseCase) {
		this.useCase = useCase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.useCase.handle(request.query.email)
			return ok(result)
		} catch (err: any) {
			return badRequest(err)
		}
	}

}