import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetPublicRefCountryController} from '@copor/core/client/Components/PublicRefdata/GetPublicRefCountryController';
import {GetPublicRefCountryListController} from '@copor/core/client/Components/PublicRefdata/GetPublicRefCountryListController';
import {GetPublicRefStateListController} from '@copor/core/client/Components/PublicRefdata/GetPublicRefStateListController';
import {GetPublicRefStateController} from '@copor/core/client/Components/PublicRefdata/GetPublicRefStateController';
//AUTO_IMPORT_DO_NOT_EDIT

export class PublicRefdataRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.get('/country/', GetPublicRefCountryListController);
		this.get('/country/:id?', GetPublicRefCountryController);
		this.get('/state/list/:id', GetPublicRefStateListController);
		this.get('/state/:id?', GetPublicRefStateController);
	}
}