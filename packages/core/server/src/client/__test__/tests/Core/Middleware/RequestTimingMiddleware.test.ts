import {NextFunction, Request, Response} from 'express';
import {requestTimingMiddleware} from '../../../../Core/Middleware/RequestTimingMiddleware';

describe('test requestTimingMiddleware', () => {
	const mockedRequest = {
		method: 'GET',
		originalUrl: '/users'
	} as unknown as jest.Mocked<Request>;
	const mockedNextFunction = jest.fn() as unknown as jest.Mocked<NextFunction>;

	let consoleLogSpy: jest.SpyInstance;
	let finishCallback: () => void;
	const mockedResponse = {
		statusCode: 200,
		on: jest.fn((event: string, callback: () => void) => {
			if (event === 'finish') finishCallback = callback;
		})
	} as unknown as jest.Mocked<Response>;

	// The timing line goes through VerboseLog; don't depend on what .env says.
	const verboseLogging = process.env.VERBOSE_LOGGING;

	beforeEach(() => {
		process.env.VERBOSE_LOGGING = 'true';
		consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
	});

	afterEach(() => {
		if (verboseLogging === undefined) delete process.env.VERBOSE_LOGGING;
		else process.env.VERBOSE_LOGGING = verboseLogging;
		consoleLogSpy.mockRestore();
	});

	it('calls next immediately without logging', () => {
		requestTimingMiddleware(mockedRequest, mockedResponse, mockedNextFunction);

		expect(mockedNextFunction).toHaveBeenCalled();
		expect(consoleLogSpy).not.toHaveBeenCalled();
	});

	it('logs method, url, status and duration once the response finishes', () => {
		requestTimingMiddleware(mockedRequest, mockedResponse, mockedNextFunction);

		finishCallback();

		expect(consoleLogSpy).toHaveBeenCalledTimes(1);
		expect(consoleLogSpy.mock.calls[0][0]).toMatch(/^\[timing\] GET \/users 200 \d+\.\d+ms$/);
	});
});
