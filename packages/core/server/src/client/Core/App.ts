import path from 'node:path';
import express, {Express, NextFunction, Request, RequestHandler, Response} from 'express';
import {RouterInstance} from '../Interface/RouterInstance';
import {BaseError, BaseErrorList} from './ErrorMiddleware/BaseError';
import {DotenvConfigOutput, DotenvParseOutput} from 'dotenv';
import {ErrorHandler} from '../Interface/ErrorHandler';
import {JwtAuthentication} from './Middleware/JwtAuthenticationMiddleware';
import {AppContext} from '../Interface/AppContext';
import {HttpStatusCode} from '../enum/HttpStatusCode';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ErrorFormatterInstance} from './ErrorMiddleware/ErrorFormatterInstance';
import {ErrorResponderInstance} from './ErrorMiddleware/ErrorResponderInstance';
import i18next from '../i18n';
import middleware from 'i18next-http-middleware';
import {configLanguageMiddleware} from './Middleware/SetLanguageMiddleware';
import {requestTimingMiddleware} from './Middleware/RequestTimingMiddleware';
import helmet from 'helmet';
import cors from 'cors';
import {CheckVersionMiddleware} from './Middleware/CheckVersionMiddleware';
import * as admin from 'firebase-admin';
import {webSocketHelper} from './WebSocket/WebSocketHelper';
import {getRegisteredModules} from '@copor/core/client/Core/Module/ModuleRegistry';
import {GlobalResponse} from '@copor/core/client/Core/GlobalResponse/GlobalResponse';
import {SetupGlobalConfigurationFiles} from '@copor/core/client/SystemSettings/SetupGlobalConfigurationFiles';
import multer from 'multer';
import {InvalidFileSizeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFileSizeException';
import {loginLimiter, publicLimiter} from '@copor/core/client/Core/EndpointLimiters';

/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars */
export default class App implements AppContext {
	public authenticationMiddleware: JwtAuthentication | undefined;
	public envVariables: DotenvParseOutput | undefined;
	private readonly app: Express;
	private requestBodyParser: RequestHandler | undefined;
	private baseRouter: RouterInstance | undefined;
	private errorHandler: ErrorHandler | undefined;
	private versionMiddleware: CheckVersionMiddleware | undefined;
	private globalResponse: GlobalResponse | undefined;

	constructor(expressInstance: Express) {
		this.app = expressInstance;
	}

	public setupRequestBodyParser(requestBodyParser: RequestHandler) {
		this.requestBodyParser = requestBodyParser;
	}

	public setupBaseRouter(baseRouter: RouterInstance) {
		this.baseRouter = baseRouter;
	}

	public setupErrorHandler(errorHandler: ErrorHandler) {
		this.errorHandler = errorHandler;
	}

	public setupEnvVariables(dotenvConfig: DotenvConfigOutput) {
		this.envVariables = dotenvConfig.parsed;
	}
	validateEnvVariables(requiredVars: string[]): void {
		if (this.envVariables === undefined) {
			throw new Error('Environment not set.');
		}

		const missingVars = requiredVars.filter((key) => !this.envVariables![key]);

		if (missingVars.length > 0) {
			throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
		}
	}

	public setupAuthenticationMiddleware(authenticationMiddleware: JwtAuthentication) {
		this.authenticationMiddleware = authenticationMiddleware;
	}

	public setupConfigFiles(setupConfig: SetupGlobalConfigurationFiles) {
		setupConfig.createFilesIfNotExists().catch((e) => console.error(e));
	}

	public setVersionMiddleware(versionMiddleware: CheckVersionMiddleware) {
		this.versionMiddleware = versionMiddleware;
	}

	public setGlobalResponseMiddleware(globalResponse: GlobalResponse) {
		this.globalResponse = globalResponse;
	}

	public start(port: number, hostName: string, webSocketPort: number) {
		this.checkParameters();
		this.initializeFirebaseAdmin();
		this.configure();

		const server = this.app.listen(webSocketPort, () => {
			console.log(`[server]: WS Server is running at http://${hostName}:${webSocketPort}`);
		});

		webSocketHelper.initialize(server, this.envVariables!.PRIVATE_KEY, this);
		for (const module of getRegisteredModules()) {
			module.onServerStart?.();
		}

		this.initializeServer(port, hostName);
		this.handleUnhandledRejection();
		this.handleUncaughtException();
	}

	public allowLocalhost(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
		//if (!origin || origin.includes('localhost') || origin.includes('*')) {
		callback(null, true);
		//} else {
		//callback(new Error('Not allowed by CORS'));
		//}
	}
	private initializeFirebaseAdmin() {
		if (!this.envVariables!.FIREBASE_ADMIN_KEY_FILE) {
			throw new Error('FIREBASE_ADMIN_KEY_FILE env variable must point to your Firebase service account key file');
		}

		admin.initializeApp({
			credential: admin.cert(require(path.resolve(process.cwd(), this.envVariables!.FIREBASE_ADMIN_KEY_FILE)))
		});

		console.log('Firebase Admin initialized');
	}

	private configure() {
		this.app.use(requestTimingMiddleware);
		this.app.use(express.json());
		this.app.use(helmet());
		this.app.use(cors({
			origin: (origin, callback) => this.allowLocalhost(origin, callback)
		}));

		this.app.use('/login', loginLimiter);

		this.app.use((req: Request, res: Response, next: NextFunction) => {
			if (this.authenticationMiddleware!.isPublicEndpoint?.(req)) {
				return publicLimiter(req, res, next);
			}
			next();
		});

		this.authenticationMiddleware!.setupPrivateKey(this.envVariables!.PRIVATE_KEY);
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			this.authenticationMiddleware!.authenticate(req, res, next);
		});
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			this.globalResponse!.appendResponse(req, res, next);
		});
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			this.versionMiddleware!.handle(req, res, next);
		});
		this.app.use(middleware.handle(i18next));
		this.app.use(configLanguageMiddleware);
		this.app.use('/', this.baseRouter!.router);
		this.app.use(this.notFoundHandler);
		this.app.use((error: Error | ErrorList | BaseError | BaseErrorList, req: Request, res: Response, next: NextFunction) => {
			const errorFormatter = new ErrorFormatterInstance();
			const errorResponderInstance = new ErrorResponderInstance();
			const normalizedError = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE'
				? new InvalidFileSizeException()
				: error;
			const formattedErrors = errorFormatter.formatErrorsToBaseErrors(normalizedError);

			void this.errorHandler!.handleError(formattedErrors);
			void errorResponderInstance.respond(formattedErrors, res);
			next();
		});
	}

	private initializeServer(port: number, host: string) {
		this.app.listen(port, host, () => {
			console.log(`[server]: Server is running at http://${host}:${port}`);
		});
	}

	private handleUnhandledRejection() {
		process.on('unhandledRejection', (reason: Error, _promise: Promise<unknown>) => {
			void this.errorHandler!.handleUnhandledRejection(reason);
		});
	}

	private notFoundHandler(req: Request, res: Response): void {
		res.status(404).json({error: 'Resource not found'});
	}

	private handleUncaughtException() {
		process.on('uncaughtException', (error: Error) => {
			console.log(error);
			void this.errorHandler!.handleUncaughtError(error);
			if (!this.errorHandler!.isTrustedError(error)) {
				this.restartServer();
			}
		});
	}

	private restartServer() {
		process.exit(1);
	}

	private checkParameters() {
		if (!this.requestBodyParser)
			throw new BaseError(
				'RequestBodyParser not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Request body parser not found in App'
			);
		if (!this.baseRouter)
			throw new BaseError(
				'BaseRouter not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Base router not found in App'
			);
		if (!this.errorHandler)
			throw new BaseError(
				'ErrorHandler not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Error handler not found in App'
			);
		if (!this.envVariables)
			throw new BaseError(
				'Environment variables not loaded',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Environment variables not loaded in App'
			);
		if (!this.authenticationMiddleware)
			throw new BaseError(
				'AuthenticationMiddleware not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Authentication middleware not found in App'
			);

		if (!this.globalResponse)
			throw new BaseError(
				'Global response not found',
				HttpStatusCode.INTERNAL_SERVER,
				true,
				'Global response not loaded in App'
			);
	}
}
