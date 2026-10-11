import {BaseController} from '../../BaseController';
import path from 'path';
import * as fs from 'fs/promises';
import {HttpStatusCode} from '@copor/core/client/enum/HttpStatusCode';

interface PublicAssetsControllerParams {
	0: string
}
export class PublicAssetsDownloadController extends BaseController<void, void> {
	async getResponse() {
		const imagePath = this.container.appContext.envVariables!.ASSETS_PATH_ON_SERVER;
		const requestParams = this.request.params as PublicAssetsControllerParams;
		const sanitizedFileName = path.normalize(requestParams['0']).replace(/^(\.\.(\/|\\|$))+/, '');
		const filePath = path.join(imagePath, sanitizedFileName);

		try {
			await fs.access(filePath);
		} catch (e) {
			if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
				this.response.sendStatus(HttpStatusCode.NOT_FOUND);
				return;
			}
			if (e instanceof Error)
				this.next(e);

			return;
		}

		this.response.status(HttpStatusCode.OK);
		this.response.sendFile(filePath);
	}
}
