import {ErrorLogger} from '../../../../Interface/ErrorLogger';
import {BaseError} from '../../../../Core/ErrorMiddleware/BaseError';
import {ErrorHandlerInstance} from '../../../../Core/ErrorMiddleware/ErrorHandlerInstance';
import {HttpStatusCode} from '../../../../enum/HttpStatusCode';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('test ErrorHandler', () => {
	let mockedLoggerInstance: jest.Mocked<ErrorLogger>;
	const error: Error = new Error('Test error');
	let errorList: ErrorList;
	let errorHandlerInstance: ErrorHandlerInstance;

	beforeEach(() => {
		mockedLoggerInstance = {
			error: jest.fn()
		} as unknown as jest.Mocked<ErrorLogger>;
		errorList = new ErrorList([new Error('test error')]);
		errorHandlerInstance = new ErrorHandlerInstance(mockedLoggerInstance);
	});
	it('call logger for Error', async () => {
		await errorHandlerInstance.handleError(errorList);
		expect(mockedLoggerInstance.error).toHaveBeenCalled();
	});
	describe('return correct value for isOperational', () => {
		it('return isOperational as false', () => {
			expect(errorHandlerInstance.isTrustedError(error)).toBe(false);
		});
		it('return isOperational as true', () => {
			const error = new BaseError('test error', HttpStatusCode.INTERNAL_SERVER, true, 'description');

			expect(errorHandlerInstance.isTrustedError(error)).toBe(true);
		});
	});
});
