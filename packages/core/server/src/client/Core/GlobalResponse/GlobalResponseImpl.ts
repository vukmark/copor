import {NextFunction, Request, Response} from 'express';
import {GlobalResponse} from '@copor/core/client/Core/GlobalResponse/GlobalResponse';
import {GlobalResponseDTO} from '@copor/core/client/Core/GlobalResponse/GlobalResponseDTO';

export class GlobalResponseImpl implements GlobalResponse {
	appendResponse(req: Request, res: Response, next: NextFunction): void {
		const originalJson = res.json.bind(res);

		res.json = function (body: GlobalResponseDTO) {
			if (body && typeof body === 'object' && !Array.isArray(body)) {
				body.cacheId = 'random_string'; // Replace it with real value from file on disk generate on update
			}

			return originalJson(body);
		};

		next();
	}
}