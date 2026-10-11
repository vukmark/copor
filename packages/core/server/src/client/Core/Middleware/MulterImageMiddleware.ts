import multer from 'multer';
import {RequestHandler} from 'express';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class MulterImageMiddleware {
	public static single(appContext: AppContext, fieldName: string = 'image'): RequestHandler {
		return multer({
			storage: multer.memoryStorage(),
			limits: {fileSize: Number(appContext.envVariables!.MAX_MEDIA_SIZE_MB) * 1024 * 1024}
		}).single(fieldName);
	}
}


export class MulterFileMiddleware {
	public static single(appContext: AppContext, fieldName: string = 'file', maxFileSizeMb?: number): RequestHandler {
		const sizeMb = maxFileSizeMb ?? Number(appContext.envVariables!.MAX_FILE_SIZE_MB);

		return multer({
			storage: multer.memoryStorage(),
			limits: {fileSize: sizeMb * 1024 * 1024}
		}).single(fieldName);
	}
}