import { UseCase } from '../../aplication/use-case/use-case'
import { ControllerOperation, HttpRequest, HttpResponse } from '../../infra/http/ports'
import { badRequest, ok } from '../../infra/http/util'

export class AcceptContactController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'requester_username', 'targuet_username']
	private useCase: UseCase

	constructor(useCase: UseCase) {
		this.useCase = useCase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.useCase.handle(request.body)
			return ok(result)
		} catch (err: any) {
			return badRequest(err)
		}
	}

}