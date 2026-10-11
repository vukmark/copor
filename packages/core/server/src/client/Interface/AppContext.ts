import {JwtAuthentication} from '../Core/Middleware/JwtAuthenticationMiddleware';
import {DotenvParseOutput} from 'dotenv';

export interface AppContext {
	authenticationMiddleware: JwtAuthentication | undefined
	envVariables: DotenvParseOutput | undefined
}