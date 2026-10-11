import express, {Express, Router} from 'express';
import {isBaseRouteCalled} from '../../testHelper/App.helper';
import App from '../../../Core/App';
import {ErrorHandler} from '../../../Interface/ErrorHandler';
import {RouterInstance} from '../../../Interface/RouterInstance';
import {BaseError} from '../../../Core/ErrorMiddleware/BaseError';
import {JwtAuthentication} from '../../../Core/Middleware/JwtAuthenticationMiddleware';
import {DotenvConfigOutput} from 'dotenv';
import {HttpStatusCode} from '../../../enum/HttpStatusCode';
import {GlobalResponse} from '../../../Core/GlobalResponse/GlobalResponse';
import {CheckVersionMiddleware} from '../../../Core/Middleware/CheckVersionMiddleware';

const FIREBASE_KEY_FILE = '/virtual/firebase-admin-key.json';

jest.mock('/virtual/firebase-admin-key.json', () => ({}), {virtual: true});
jest.mock('firebase-admin', () => ({
	initializeApp: jest.fn(),
	cert: jest.fn()
}));
jest.mock('../../../Core/WebSocket/WebSocketHelper', () => ({
	webSocketHelper: {initialize: jest.fn()}
}));
jest.mock('../../../Core/Module/coreModules', () => ({
	allModules: [{name: 'test', onServerStart: jest.fn()}]
}));
jest.mock('../../../i18n', () => ({
	__esModule: true,
	default: {}
}));
jest.mock('i18next-http-middleware', () => ({
	handle: jest.fn(() => jest.fn())
}));


jest.mock('express', () => {
	const actualExpress: Express = jest.requireActual('express');

	return {
		... actualExpress,
		json: jest.fn(() => jest.fn()),
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Router: jest.fn(() => {
			return {
				get: jest.fn(),
				use: jest.fn(),
				post: jest.fn(),
				patch: jest.fn(),
				delete: jest.fn()
			} as unknown as jest.Mocked<Router>;
		})
	};
});

describe('test App', () => {
	let app: App;
	const port = 3000;
	const hostName = 'localhost';
	const webSocketPort = 3001;
	const realProcessExit = process;
	const mockedErrorHandlerInstance: jest.Mocked<ErrorHandler> = {
		handleError: jest.fn(),
		isTrustedError: jest.fn().mockReturnValue(false),
		handleUncaughtError: jest.fn(),
		handleUnhandledRejection: jest.fn()
	};

	const mockedConfigOutput: jest.Mocked<DotenvConfigOutput> = {
		parsed: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			PRIVATE_KEY: 'asdasdaweasdasdawdasd',
			// eslint-disable-next-line @typescript-eslint/naming-convention
			FIREBASE_ADMIN_KEY_FILE: FIREBASE_KEY_FILE
		}
	};

	const mockedExpressInstance = {
		use: jest.fn(),
		listen: jest.fn().mockReturnValue({})
	} as unknown as jest.Mocked<Express>;

	const mockedGlobalResponse = {
		appendResponse: jest.fn()
	} as unknown as jest.Mocked<GlobalResponse>;

	const mockedVersionMiddleware = {
		handle: jest.fn()
	} as unknown as jest.Mocked<CheckVersionMiddleware>;

	const mockedBaseRouter = {
		router: express.Router()
	} as unknown as jest.Mocked<RouterInstance>;

	const mockedAuthenticationMiddleware: jest.Mocked<JwtAuthentication> = {
		authenticate: jest.fn(),
		setupPrivateKey: jest.fn(),
		getActorId: jest.fn()
	};

	beforeEach(() => {
		jest.resetModules();
		process.exit = jest.fn(() => undefined as never);
		app = new App(mockedExpressInstance);
	});

	afterAll(() => {
		global.process = realProcessExit;
	});

	describe('throw error if setup incorrectly', () => {
		it('throw error for no request body parser', () => {
			const error = new BaseError(
				'RequestBodyParser not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Request body parser not found in App'
			);

			expect(() => {
				app.setupEnvVariables(mockedConfigOutput);
				app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
				app.setupBaseRouter(mockedBaseRouter);
				app.setupErrorHandler(mockedErrorHandlerInstance);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
		it('throw error for no error handler', () => {
			const error = new BaseError(
				'ErrorHandler not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Error handler not found in App'
			);

			expect(() => {
				app.setupEnvVariables(mockedConfigOutput);
				app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
				app.setupRequestBodyParser(express.json());
				app.setupBaseRouter(mockedBaseRouter);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
		it('throw error for no base router', () => {
			const error = new BaseError(
				'BaseRouter not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Base router not found in App'
			);

			expect(() => {
				app.setupEnvVariables(mockedConfigOutput);
				app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
				app.setupRequestBodyParser(express.json());
				app.setupErrorHandler(mockedErrorHandlerInstance);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
		it('throw error for no environment variables loaded', () => {
			const error = new BaseError(
				'Environment variables not loaded',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Environment variables not loaded in App'
			);

			expect(() => {
				app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
				app.setupBaseRouter(mockedBaseRouter);
				app.setupRequestBodyParser(express.json());
				app.setupErrorHandler(mockedErrorHandlerInstance);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
		it('throw error for no authentication middleware', () => {
			const error = new BaseError(
				'AuthenticationMiddleware not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Authentication middleware not found in App'
			);

			expect(() => {
				app.setupEnvVariables(mockedConfigOutput);
				app.setupBaseRouter(mockedBaseRouter);
				app.setupRequestBodyParser(express.json());
				app.setupErrorHandler(mockedErrorHandlerInstance);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
		it('throw error for no global response middleware', () => {
			const error = new BaseError(
				'Global response not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Global response not loaded in App'
			);

			expect(() => {
				app.setupEnvVariables(mockedConfigOutput);
				app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
				app.setupBaseRouter(mockedBaseRouter);
				app.setupRequestBodyParser(express.json());
				app.setupErrorHandler(mockedErrorHandlerInstance);
				app.start(port, hostName, webSocketPort);
			}).toThrow(error);
		});
	});
	describe('setup correctly', () => {
		beforeEach(() => {
			app.setGlobalResponseMiddleware(mockedGlobalResponse);
			app.setVersionMiddleware(mockedVersionMiddleware);
			app.setupEnvVariables(mockedConfigOutput);
			app.setupAuthenticationMiddleware(mockedAuthenticationMiddleware);
			app.setupBaseRouter(mockedBaseRouter);
			app.setupRequestBodyParser(express.json());
			app.setupErrorHandler(mockedErrorHandlerInstance);
			app.start(port, hostName, webSocketPort);
		});
		it('expect authentication middleware private key to be loaded', () => {
			expect(mockedAuthenticationMiddleware.setupPrivateKey).toHaveBeenCalled();
		});
		it('uses request body parser', () => {
			expect(express.json).toHaveBeenCalled();
		});
		it('calls router with "/" path', () => {
			expect(isBaseRouteCalled(mockedExpressInstance)).toBe(true);
			expect(express.Router).toHaveBeenCalled();
		});
		it('needs to listen to given port and websocket port', () => {
			expect(mockedExpressInstance.listen).toHaveBeenCalledWith(port, hostName, expect.any(Function));
			expect(mockedExpressInstance.listen).toHaveBeenCalledWith(webSocketPort, expect.any(Function));
		});
		it('catches unhandled rejections', () => {
			const reason = 'Unhandled rejection reason';

			process.emit('unhandledRejection', reason, Promise.resolve());
			expect(mockedErrorHandlerInstance.handleUnhandledRejection).toHaveBeenCalledWith(reason);
		});
		describe('catches uncaught errors', () => {
			it('catches untrusted errors', () => {
				const error = new Error('uncaught untrusted error');

				process.emit('uncaughtException', error);
				expect(mockedErrorHandlerInstance.isTrustedError).toHaveBeenCalledWith(error);
				expect(mockedErrorHandlerInstance.handleUncaughtError).toHaveBeenCalledWith(error);
				expect(process.exit).toHaveBeenCalledWith(1);
			});
			it('catches trusted errors', () => {
				const error = new BaseError('uncaught trusted error', HttpStatusCode.BAD_REQUEST, true, '');

				mockedErrorHandlerInstance.isTrustedError.mockReturnValue(true);
				process.emit('uncaughtException', error);
				expect(mockedErrorHandlerInstance.isTrustedError).toHaveBeenCalledWith(error);
				expect(mockedErrorHandlerInstance.handleUncaughtError).toHaveBeenCalledWith(error);
				expect(process.exit).not.toHaveBeenCalled();
			});
		});
	});
});
