import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetChangelogListController} from '@copor/help/client/Help/Changelog/GetChangelogListController';
import {GetChangelogController} from '@copor/help/client/Help/Changelog/GetChangelogController';

export class HelpRouter extends BaseRouter {
	protected initializeRoutes() {
		this.get('/changelog', GetChangelogListController);
		this.get('/changelog/:version', GetChangelogController);
	}
}
