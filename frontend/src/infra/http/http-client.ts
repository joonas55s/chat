import { Either } from '../../shared/either'
import ResponseError from '../../shared/response-error'

export default interface HttpClient {
    get(url: string): Promise<Either<ResponseError, any>>,
    delete(url: string): Promise<Either<ResponseError, any>>,
    post(url: string, body: any): Promise<Either<ResponseError, any>>,
    put(url: string, body: any): Promise<Either<ResponseError, any>>,
}