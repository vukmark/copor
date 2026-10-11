import {HttpStatusCode} from '../../enum/HttpStatusCode';

export class BaseError extends Error {
	public readonly httpCode: HttpStatusCode;
	public name: string;
	public isOperational: boolean;
	public message: string;
	public stack?: string;
	constructor(
		name: string,
		httpCode: number,
		isOperational: boolean,
		message: string,
		stack?: string
	) {
		super(message);
		this.name = name;
		this.httpCode = httpCode;
		this.message = message;
		this.isOperational = isOperational;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}


export class BaseErrorList {
	public list: BaseError[] = [];

	constructor(errors: BaseError[]) {
		this.list = errors;
	}
}
export class APIError extends BaseError {
	constructor(name: string,
		httpCode = HttpStatusCode.INTERNAL_SERVER,
		isOperational = true,
		description = 'internal server error') {
		super(name, httpCode, isOperational, description);
	}
}
