export default class ResponseError extends Error {
	public readonly name = 'ResponseError'
	constructor (message: string,readonly statusCode: number) {
		super(message + '.')
	}
}