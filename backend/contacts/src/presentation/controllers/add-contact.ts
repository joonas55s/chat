import { UseCase } from '../../aplication/use-case/use-case'
import { ControllerOperation, HttpRequest, HttpResponse } from '../../infra/http/ports'
import { badRequest, created } from '../../infra/http/util'

export class AddContactController implements ControllerOperation {
	readonly requiredParams: string[] = ['ownerUserName','contactUserName']
	private useCase: UseCase

	constructor(useCase: UseCase) {
		this.useCase = useCase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.useCase.handle(request.body)
			return created(result)
		} catch (err: any) {
			return badRequest(err)
		}
	}

}