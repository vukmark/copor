import {Express} from 'express';

export function isBaseRouteCalled(mockedExpressInstance: jest.Mocked<Express>) {
	const routerCalls = mockedExpressInstance.use.mock.calls;

	return routerCalls.some((call) => {
		const callFirstParameter = 0;

		return call[callFirstParameter] === '/';
	});
}