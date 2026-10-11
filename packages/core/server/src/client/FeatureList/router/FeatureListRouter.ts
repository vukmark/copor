import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetFeatureListController} from '@copor/core/client/FeatureList/GetFeatureList/GetFeatureListController';
import {GetMenuController} from '@copor/core/client/FeatureList/GetMenu/GetMenuController';

export class FeatureListRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.get('/', GetFeatureListController);
		this.get('/menu', GetMenuController);
	}
}