import {BaseError, BaseErrorList} from '../../../Core/ErrorMiddleware/BaseError';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ErrorFormatterInstance} from '../../../Core/ErrorMiddleware/ErrorFormatterInstance';

jest.mock('i18next', () => ({
	setDefaultNamespace: jest.fn(),
	t: (key: string) => key
}));

// Errors without an explicit mapping in ErrorToHttpStatusCode fall back to 400.
const DEFAULT_STATUS = 400;

class TestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TestError';
	}
}

class TestError2 extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TestError2';
	}
}

class TestError3 extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TestError3';
	}
}

describe('ErrorFormatterInstance', () => {
	it('should format Error into BaseError', () => {
		const error = new TestError('Test base error');
		const error2 = new TestError2('Test base error');
		const error3 = new TestError3('Test base error');
		const inputErrorList: ErrorList = new ErrorList([error, error2, error3]);

		const errorFormatter = new ErrorFormatterInstance();

		const baseError = new BaseError(error.name, DEFAULT_STATUS, true, error.message);
		const baseError2 = new BaseError(error2.name, DEFAULT_STATUS, true, error2.message);
		const baseError3 = new BaseError(error3.name, DEFAULT_STATUS, true, error3.message);
		const expectedResult: BaseErrorList = new BaseErrorList([baseError, baseError2, baseError3]);

		expect(errorFormatter.formatErrorsToBaseErrors(inputErrorList)).toEqual(expectedResult);
	});

	it('should return BaseErrorList as is', () => {
		const baseError = new BaseError('TestError', 401, true, 'Test base error');
		const baseError2 = new BaseError('TestError2', 401, true, 'Test base error');
		const baseError3 = new BaseError('TestError3', 404, true, 'Test base error');
		const inputErrorList: BaseErrorList = new BaseErrorList([baseError, baseError2, baseError3]);

		const errorFormatter = new ErrorFormatterInstance();

		expect(errorFormatter.formatErrorsToBaseErrors(inputErrorList)).toEqual(inputErrorList);
	});

	it('should handle single BaseError', () => {
		const baseError = new BaseError('TestError', 401, true, 'Test base error');

		const errorFormatter = new ErrorFormatterInstance();
		const expectedResult: BaseErrorList = new BaseErrorList([baseError]);

		expect(errorFormatter.formatErrorsToBaseErrors(baseError)).toEqual(expectedResult);
	});

	it('should handle single Error', () => {
		const error = new TestError('Test base error');
		const baseError = new BaseError(error.name, DEFAULT_STATUS, true, error.message);
		const expectedResult: BaseErrorList = new BaseErrorList([baseError]);

		const errorFormatter = new ErrorFormatterInstance();

		expect(errorFormatter.formatErrorsToBaseErrors(error)).toEqual(expectedResult);
	});
});
