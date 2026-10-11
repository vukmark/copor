import i18next from 'i18next';
import {NextFunction, Request, Response} from 'express';
import {containerMock, nextFunctionMock, responseMock} from '../../testHelper/Mocks';
import {Container} from '../../../Interface/Container';
import {LocaleController, ResourceBundle} from '../../../Locale/LocaleController';

const testResourceBundle: ResourceBundle = {
	'login': 'logas ova muda',
	'username': 'username'
};

jest.mock('i18next', () => {
	return {
		getResourceBundle: jest.fn(() => {
			return testResourceBundle;
		})
	};
});
describe('Test LocaleController', () => {
	const mockedRequest = {
		body: undefined,
		params: {
			ns: 'test'
		},
		language: 'test'
	} as unknown as jest.Mocked<Request>;
	const mockedResponse = responseMock as unknown as jest.Mocked<Response>;
	const mockedNextFunction: jest.Mocked<NextFunction> = nextFunctionMock;
	const mockedContainer: jest.Mocked<Container> = containerMock;


	it('returns resource bundle', () => {
		const localeController = new LocaleController(mockedContainer, mockedRequest, mockedResponse, mockedNextFunction);

		localeController.getResponse();

		expect(i18next.getResourceBundle).toHaveBeenCalledWith('test', 'test');
		expect(mockedResponse.send).toHaveBeenCalledWith(testResourceBundle);
	});
});


