
import { Request, Response } from 'express'
import { HttpRequest } from '../ports'
import { WebController } from '../web-controller'


export const adaptRoute = (controller: WebController) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
			params:req.params,
			query:req.query
		}
		const httpResponse = await controller.handle(httpRequest)
		res.status(httpResponse.statusCode).json(httpResponse.body)
	}
}