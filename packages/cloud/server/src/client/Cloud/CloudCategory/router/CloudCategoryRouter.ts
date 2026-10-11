import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {
    CreateCloudCategoryController
} from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/CreateCloudCategoryController';
import {GetCloudCategoryController} from '@copor/cloud/client/Cloud/CloudCategory/GetCloudCategory/GetCloudCategoryController';
import {
    GetCloudCategoryListController
} from '@copor/cloud/client/Cloud/CloudCategory/GetCloudCategoryList/GetCloudCategoryListController';
import {
    UpdateCloudCategoryController
} from '@copor/cloud/client/Cloud/CloudCategory/UpdateCloudCategory/UpdateCloudCategoryController';
import {
    DeleteCloudCategoryController
} from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/DeleteCloudCategoryController';

export class CloudCategoryRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateCloudCategoryController);
		this.get('/:id', GetCloudCategoryController);
		this.get('/', GetCloudCategoryListController);
		this.patch('/', UpdateCloudCategoryController);
		this.delete('/:id', DeleteCloudCategoryController);
	}
}