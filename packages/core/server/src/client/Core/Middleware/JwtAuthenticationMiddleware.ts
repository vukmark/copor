import {NextFunction, Request, Response} from 'express';
import {BaseError} from '../ErrorMiddleware/BaseError';
import jwt, {JwtPayload, VerifyErrors} from 'jsonwebtoken';
import {HttpStatusCode} from '../../enum/HttpStatusCode';

export interface JwtAuthentication {
	isPublicEndpoint?: (req: Request) => boolean;
	setupPrivateKey(privateKey: string): void;
	authenticate(req: Request, res: Response, next: NextFunction): void;
	getActorId(): string;
}

export interface JwtPayloadWithUserId extends JwtPayload {
	userId: string;
}

export class JwtAuthenticationMiddleware implements JwtAuthentication {
	private excludedEndpoints: {path: string, method: string}[] = [
		{path: '/login/*', method: 'POST'},
		{path: '/filter/*', method: 'GET'},
		{path: '/state/list/*', method: 'GET'},
		{path: '/region-city/list', method: 'POST'},
		{path: '/logo', method: 'GET'},
		{path: '/assets/*', method: 'GET'},
		{path: '/refdata/*', method: 'GET'},
		{path: '/activation/*', method: 'PATCH'},
		{path: '/password/validate', method: 'POST'},
		{path: '/password/policy', method: 'GET'},
		{path: '/user/inactive/*', method: 'GET'},
		{path: '/locale/*', method: 'GET'},
		{path: '/language/*', method: 'GET'},
		{path: '/wsconfig/*', method: 'GET'},
		{path: '/envconfig/*', method: 'GET'},
		{path: '/contract/sign/', method: 'POST'},
		{path: '/role/', method: 'GET'},
		{path: '/documents/TermsAndConditions/', method: 'GET'},
		{path: '/documents/Impressum/', method: 'GET'},
		{path: '/state/simple-list/*', method: 'GET'},
		{path: '/native-language/simple-list/*', method: 'POST'},
		{path: '/email/send', method: 'POST'},
		{path: '/', method: 'GET'},
		{path: '/info/*', method: 'GET'},
		{path: '/user/forgot-password/send-code', method: 'POST'},
		{path: '/user/forgot-password/verify-code', method: 'POST'},
		{path: '/user/forgot-password/reset-password', method: 'POST'},
		{path: '/registration/status', method: 'GET'},
		{path: '/registration/*', method: 'POST'},
		{path: '/help/changelog', method: 'GET'},
		{path: '/help/changelog/*', method: 'GET'}
	];
	private privateKey: string = '';
	private actorId: string = '';

	public isPublicEndpoint = (req: Request): boolean => {
		return this.isExcludedEndpoint(req);
	};

	public setupPrivateKey(privateKey: string) {
		this.privateKey = privateKey;
	}

	public authenticate = (req: Request, res: Response, next: NextFunction) => {
		if (this.isExcludedEndpoint(req)) {
			return next();
		}

		const token = this.getAuthenticationTokenFromRequestHeader(req);

		if (!this.privateKey) {
			return this.throwError(
				new BaseError(
					'Private Key is undefined',
					HttpStatusCode.INTERNAL_SERVER,
					true,
					'Private key from environment is undefined'
				),
				next
			);
		}

		if (!token) {
			return this.throwError(
				new BaseError(
					'AuthenticationTokenNotFound',
					HttpStatusCode.UNAUTHORIZED,
					true,
					'No authentication token was found in your request, could not verify your request.'
				),
				next
			);
		}

		jwt.verify(token, this.privateKey, (error: VerifyErrors | null) => {
			if (error) {
				return this.handleTokenError(error, next);
			}

			const jwtPayload = jwt.decode(token) as JwtPayloadWithUserId;

			this.actorId = jwtPayload.userId;
			next();
		});
	};

	public getActorId(): string {
		return this.actorId;
	}

	private isExcludedEndpoint = (req: Request): boolean => {
		for (const endpoint of this.excludedEndpoints) {
			if (endpoint.path.endsWith('/*')) {
				const basePath = endpoint.path.slice(0, -2);

				if (req.path.startsWith(basePath) && req.method === endpoint.method) {
					return true;
				}
			} else if (endpoint.path === req.path && req.method === endpoint.method) {
				return true;
			}
		}
		return false;
	};

	private getAuthenticationTokenFromRequestHeader = (req: Request): string | undefined => {
		const authHeader = req.headers.authorization;

		return authHeader?.split(' ')[1];
	};

	private handleTokenError = (error: VerifyErrors, next: NextFunction) => {
		const errorMessage = error.name === 'TokenExpiredError'
			? 'Authentication token in your request has expired, please refresh your token.'
			: 'Your authentication token is invalid';

		const statusCode = error.name === 'TokenExpiredError' ? HttpStatusCode.UNAUTHORIZED : HttpStatusCode.UNAUTHORIZED;

		return this.throwError(
			new BaseError(
				error.name,
				statusCode,
				true,
				errorMessage
			),
			next
		);
	};

	private throwError = (error: BaseError, next: NextFunction) => {
		next(error);
	};
}
