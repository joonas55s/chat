import { AppStorage } from '@domain/appStorage'
import { UseCase } from '../use-case'
import ResponseError from '@shared/response-error'
import { Either, right } from '@shared/either'

export default class Exit implements UseCase {
	constructor(private appStorage: AppStorage) {}
	async handle(callback?: Function): Promise<Either<ResponseError, void>> {
		this.appStorage.clear()
		if (callback) callback()
		return right(undefined)
	}
}
