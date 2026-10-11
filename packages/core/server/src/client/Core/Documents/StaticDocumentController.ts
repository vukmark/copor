import {BaseController} from '@copor/core/client/Core/BaseController';
import {HttpStatusCode} from '@copor/core/client/enum/HttpStatusCode';
import path from 'path';

export abstract class StaticDocumentController extends BaseController<undefined, void> {
	protected abstract getFileName(): string;

	async getResponse(): Promise<void> {
		const assetsPath = this.container.appContext.envVariables!.ASSETS_PATH_ON_SERVER;
		const fileName = this.getFileName();

		this.response.status(HttpStatusCode.OK);
		this.response.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
		this.response.sendFile(path.join(assetsPath, 'documents', fileName));
	}
}
