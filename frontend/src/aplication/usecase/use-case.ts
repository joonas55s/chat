import { Either } from '@shared/either'
import ResponseError from '@shared/response-error'

export interface UseCase {
  handle(request: any): Promise<Either<ResponseError, any>>
}