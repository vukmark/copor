import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {JwtAuthenticationMiddleware} from '../../../../Core/Middleware/JwtAuthenticationMiddleware';
import {BaseError} from '../../../../Core/ErrorMiddleware/BaseError';
import {HttpStatusCode} from '../../../../enum/HttpStatusCode';
import {nextFunctionMock, responseMock} from '../../../testHelper/Mocks';

describe('test JwtAuthenticationMiddleware', () => {
	const privateKey = 'b1921561619f44c879b27c10b3199f5b4a84816a7cae17e'
		+ '15a218c29abdaf81df8ffc9eaf140ce0cbaedd7c219a626aea410788f86e791e647fce1e7aa196f15';
	const mockedRequest = {
		headers: {},
		path: '/'
	} as unknown as jest.Mocked<Request>;
	const mockedResponse = responseMock as unknown as jest.Mocked<Response>;
	const mockedNextFunction = nextFunctionMock as unknown as jest.Mocked<NextFunction>;
	const authenticationMiddleware = new JwtAuthenticationMiddleware();
	const tokenExpiredError = new BaseError(
		'TokenExpiredError',
		HttpStatusCode.BAD_REQUEST,
		true,
		'Authentication token in your request has expired, please refresh your token.'
	);
	const tokenInvalidError = new BaseError(
		'JsonWebTokenError',
		HttpStatusCode.BAD_REQUEST,
		true,
		'Your authentication token is invalid'
	);
	const tokenNotFoundError = new BaseError(
		'AuthenticationTokenNotFound',
		HttpStatusCode.INTERNAL_SERVER,
		true,
		'No authentication token was found in your request, could not verify your request.'
	);
	const privateKeyNotFoundError = new BaseError(
		'Private Key is undefined',
		HttpStatusCode.INTERNAL_SERVER,
		true,
		'Private key from environment is undefined'
	);

	it('throw error if private key is undefined', () => {
		authenticationMiddleware.authenticate(mockedRequest, mockedResponse, mockedNextFunction);
		expect(nextFunctionMock).toHaveBeenCalledWith(privateKeyNotFoundError);
	});
	describe('throw error if private key is defined', () => {
		beforeEach(() => {
			authenticationMiddleware.setupPrivateKey(privateKey);
		});
		it('throw error if not token in request header', () => {
			authenticationMiddleware.authenticate(mockedRequest, mockedResponse, mockedNextFunction);
			expect(nextFunctionMock).toHaveBeenCalledWith(tokenNotFoundError);
		});
		it('throw error if token expired', () => {
			mockedRequest.headers = {
				authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
					+ '.eyJ1c2VySWQiOiI1NTUtMzMzIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaWF0IjoxNzE3NTc3OTY5LCJleHAiOjE3MTc1NzgyNjl9'
					+ '.Prk9-gmjrS_n9pjknbTGzcMzYehRQ3_A8c78y6BpReY'
			};
			authenticationMiddleware.authenticate(mockedRequest, mockedResponse, mockedNextFunction);
			expect(nextFunctionMock).toHaveBeenCalledWith(tokenExpiredError);
		});
		it('throw error if token invalid', () => {
			mockedRequest.headers = {
				authorization: 'Bearer Skobotnica?'
			};
			authenticationMiddleware.authenticate(mockedRequest, mockedResponse, mockedNextFunction);
			expect(nextFunctionMock).toHaveBeenCalledWith(tokenInvalidError);
		});
		it('verify token from header', () => {
			const authToken = jwt.sign({}, privateKey, {expiresIn: '5m'});

			mockedRequest.headers = {
				authorization: `Bearer ${authToken}`
			};
			authenticationMiddleware.authenticate(mockedRequest, mockedResponse, mockedNextFunction);
			expect(nextFunctionMock).not.toHaveBeenCalledWith(Error);
		});
	});
});
