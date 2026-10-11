import {Response} from 'express';
import {ErrorResponderInstance} from '../../../Core/ErrorMiddleware/ErrorResponderInstance';
import {BaseError, BaseErrorList} from '../../../Core/ErrorMiddleware/BaseError';
import {HttpStatusCode} from '../../../enum/HttpStatusCode';

describe('test ErrorResponder', () => {
	it('respond with error list', () => {
		const errorList: BaseErrorList = {
			list: [
				new BaseError('TestError', HttpStatusCode.UNAUTHORIZED, true, 'This is a test error'),
				new BaseError('TestError2', HttpStatusCode.BAD_REQUEST, true, 'This is another test error')
			]
		};
		const expectedResponseFormat = [
			{
				TestError: 'This is a test error'
			},
			{
				TestError2: 'This is another test error'
			}
		];

		const json = jest.fn();
		const mockedResponse = {
			status: jest.fn().mockReturnValue({json})
		} as unknown as Response;
		const errorResponder = new ErrorResponderInstance();

		errorResponder.respond(errorList, mockedResponse);
		expect(mockedResponse.status).toHaveBeenCalledWith(401);
		expect(json).toHaveBeenCalledWith(expectedResponseFormat);
	});
});
