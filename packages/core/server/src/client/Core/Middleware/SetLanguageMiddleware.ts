import {NextFunction, Request, Response} from 'express';
import i18next, {i18nRequestContext} from '@copor/core/client/i18n';

export const configLanguageMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const endpoint = req.path.split('/')[1];

	i18nRequestContext.run(req.i18n, () => {
		i18next.setDefaultNamespace(endpoint);
		next();
	});
};
