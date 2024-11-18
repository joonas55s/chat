import { UseCase } from '../../aplication/use-case/use-case'
import { ControllerOperation, HttpRequest, HttpResponse } from '../../infra/http/ports'
import { badRequest, ok } from '../../infra/http/util'

export class FindContactsController implements ControllerOperation {
	readonly requiredParams: string[] = ['username']
	private useCase: UseCase

	constructor(useCase: UseCase) {
		this.useCase = useCase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.useCase.handle(request.query.username)
			return ok(result)
		} catch (err: any) {
			return badRequest(err)
		}
	}

}