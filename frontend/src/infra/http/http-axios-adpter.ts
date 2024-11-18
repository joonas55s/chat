import HttpClient from '../http/http-client'
import axios, { AxiosInstance } from 'axios'
import { Either, right, left } from '@shared/either'
import ResponseError from '@shared/response-error'
export default class AxiosAdapter implements HttpClient {
	readonly apiAxios: AxiosInstance

	constructor(private baseurl: string) {
		const axiosInstance = axios.create({})
		axiosInstance.defaults.baseURL = baseurl
		this.apiAxios = axiosInstance
		const jwt = sessionStorage.getItem('jwt')
		if (jwt) this.apiAxios.defaults.headers.Authorization = jwt
	}

	async get(url: string): Promise<Either<ResponseError, any>> {
		try {
			const response = await this.apiAxios.get(url)
			return right(response.data)
		} catch (err: any) {
			return left(new ResponseError(err.response.data, err.statusCode))
		}
	}

	async post(url: string, body: any): Promise<Either<ResponseError, any>> {
		try {
			const response = await this.apiAxios.post(url, body)
			return right(response.data)
		} catch (err: any) {
			return left(new ResponseError(err.response.data, err.statusCode))
		}
	}

	async put(url: string, body: any): Promise<Either<ResponseError, any>> {
		try {
			const response = await this.apiAxios.put(url, body)
			return right(response.data)
		} catch (err: any) {
			return left(new ResponseError(err.response.data, err.statusCode))
		}
	}

	async delete(url: string): Promise<Either<ResponseError, any>> {
		try {
			const response = await this.apiAxios.delete(url)
			return right(response.data)
		} catch (err: any) {
			return left(new ResponseError(err.response.data, err.statusCode))
		}
	}
}