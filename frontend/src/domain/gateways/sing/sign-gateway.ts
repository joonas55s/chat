import Account from '../../entities/account'
import { Either } from '../../../shared/either'
import ResponseError from '../../../shared/response-error'
export interface ISignGateway {
    singIn(email: string, password: string): Promise<Either<ResponseError, Account>>
    singUp(input: inputSingUp): Promise<Either<ResponseError, singUpOutPut>>
}
export interface inputSingUp {
    username: string,
    name: string,
    email: string,
    password: string,
}

export interface singUpOutPut {
    data?: any,
    statuscode: number,
    message?: string
}