import {NextFunction, Request, Response} from 'express';
import {verboseLog} from '@copor/core/client/Core/Helpers/VerboseLog';

export const requestTimingMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const start = process.hrtime.bigint();

	res.on('finish', () => {
		const durationMs = Number(process.hrtime.bigint() - start) / 1e6;

		verboseLog(`[timing] ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs.toFixed(1)}ms`);
	});

	next();
};
