import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetHtmlPagesRepoPicker} from '@copor/core/client/InfoPages/GetHtmlPages/repoPicker/GetHtmlPagesRepoPicker';
import {InfoPagesParams} from '@copor/core/client/enum/InfoPagesParams';

interface GetInfoPageParams {
	id: InfoPagesParams;
}

export class GetHtmlPagesController extends BaseController<undefined, string> {
	public async getResponse(): Promise<void> {
		const {id} = this.request.params as GetInfoPageParams;
		const repo = this.container.getNewRepoPicker(GetHtmlPagesRepoPicker);

		const html = await repo.load(id);

		this.response.status(200);
		this.response.type('html');
		this.response.send(html);
	}
}