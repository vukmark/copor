import {Request, Response, NextFunction} from 'express';
import {VersionChecker} from '../Helpers/VersionChecker';

export class CheckVersionMiddleware {
	public handle(req: Request, res: Response, next: NextFunction): void | Response {
		try {
			if (req.url.startsWith('/assets/') || req.url.startsWith('/info/')) {
				return next();
			}
			const clientVersion = req.headers['x-version'] as string;

			if (!clientVersion) {
				return res.status(400).json([{Error: 'Version header is missing'}]);
			}
			VersionChecker.validateVersion(clientVersion);

			next();
		} catch (error) {
			next(error);
		}
	}
}
