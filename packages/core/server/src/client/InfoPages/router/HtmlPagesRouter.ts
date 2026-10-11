import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetHtmlPagesController} from '@copor/core/client/InfoPages/GetHtmlPages/GetHtmlPagesController';

export class HtmlPagesRouter extends BaseRouter {
	protected initializeRoutes() {
		this.get('/:id', GetHtmlPagesController);
	}
}