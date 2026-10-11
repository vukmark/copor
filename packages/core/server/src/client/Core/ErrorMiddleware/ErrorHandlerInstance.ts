import {BaseError} from './BaseError';
import {ErrorLogger} from '../../Interface/ErrorLogger';
import {ErrorHandler} from '../../Interface/ErrorHandler';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
/* eslint-disable @typescript-eslint/no-misused-promises */

export class ErrorHandlerInstance implements ErrorHandler {
	private readonly logger: ErrorLogger;

	constructor(logger: ErrorLogger) {
		this.logger = logger;
	}

	public isTrustedError(error: Error) {
		if (error instanceof BaseError) {
			return error.isOperational;
		}
		return false;
	}

	public async handleError(errorList: ErrorList): Promise<void> {
		await Promise.all(
			errorList.list.map((error) => this.logger.error('Operational Error', error))
		);
	}

	public async handleUncaughtError(error: Error): Promise<void> {
		await this.logger.error('Uncaught Error', error);
	}

	public async handleUnhandledRejection(error: Error): Promise<void> {
		await this.logger.error('Unhandled Rejection', error);
	}
}