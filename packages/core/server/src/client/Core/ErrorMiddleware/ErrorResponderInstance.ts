import {Response} from 'express';
import {ErrorResponder} from '../../Interface/ErrorResponder';
import {BaseError, BaseErrorList} from './BaseError';

export class ErrorResponderInstance implements ErrorResponder {
	public respond(errorList: BaseErrorList, response: Response) {
		const highestStatusCode = this.getHighestStatusCode(errorList);


		response.status(highestStatusCode).json(
			errorList.list.map((error) => ({
				[error.name]: error.message ?? 'undefined'
			}))
		);
	}
	private getHighestStatusCode(errorList: BaseErrorList): number {
		return errorList.list.reduce((max, error: BaseError) => {
			return error.httpCode > max ? error.httpCode : max;
		}, 200);
	}
}