import jwt from 'jsonwebtoken';
import {BaseController} from '@copor/core/client/Core/BaseController';
import {BaseError} from '@copor/core/client/Core/ErrorMiddleware/BaseError';
import {HttpStatusCode} from '@copor/core/client/enum/HttpStatusCode';
import {TokenPayload} from '@copor/core/client/Login/Login/interface/TokenPayload';
import {LoginResponseDTO} from '@copor/core/client/Login/Login/dto/LoginResponseDTO';

export class RefreshController extends BaseController<string, LoginResponseDTO> {
	getResponse() {
		const authHeader = this.request.headers.authorization;
		const env = this.container.appContext.envVariables!;

		if (!authHeader?.startsWith('Bearer ')) {
			this.next(new BaseError(
				'RefreshTokenRequiredException',
				HttpStatusCode.BAD_REQUEST,
				true,
				'Refresh token is required'
			));
			return;
		}

		// Extract the token from the Authorization header
		const refreshToken = authHeader.split(' ')[1];
		let decodedToken: TokenPayload;

		try {
			decodedToken = jwt.verify(refreshToken, env.PRIVATE_KEY) as TokenPayload;
		} catch (error) {
			this.next(new BaseError(
				'InvalidRefreshTokenException',
				HttpStatusCode.UNAUTHORIZED,
				true,
				'Invalid refresh token'
			));
			return;
		}

		if (decodedToken.tokenType !== 'refresh') {
			this.next(new BaseError(
				'InvalidTokenTypeException',
				HttpStatusCode.UNAUTHORIZED,
				true,
				'Invalid token type'
			));
			return;
		}

		try {
			const authTokenPayload: TokenPayload = {
				userId: decodedToken.userId,
				tokenType: 'access'
			};
			const newRefreshTokenPayload: TokenPayload = {
				userId: decodedToken.userId,
				tokenType: 'refresh'
			};
			const authToken = jwt.sign(authTokenPayload, env.PRIVATE_KEY, {expiresIn: '1m'});
			const newRefreshToken = jwt.sign(newRefreshTokenPayload, env.PRIVATE_KEY, {expiresIn: '7d'});

			this.response.status(200);
			this.response.send({authToken, refreshToken: newRefreshToken});
		} catch (error) {
			if (error instanceof Error) {
				this.next(error);
			}
		}
	}
}
