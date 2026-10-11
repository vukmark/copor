import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateTenantController} from '../CreateTenant/CreateTenantController';
import {DeleteTenantController} from '../DeleteTenant/DeleteTenantController';
import {UpdateTenantController} from '../UpdateTenant/UpdateTenantController';
import {GetTenantController} from '../GetTenant/GetTenantController';
import {GetTenantListController} from '../GetTenantList/GetTenantListController';
import {SearchTenantListController} from '../SearchTenantList/SearchTenantListController';
import {GetBaseTenantListController} from '@copor/core/client/Components/Tenant/GetBaseTenantList/GetBaseTenantListController';
import {GetTenantSimpleListController}
	from '@copor/core/client/Components/Tenant/GetTenantSimpleList/GetTenantSimpleListController';
import {GetTenantTableController} from '@copor/core/client/Components/Tenant/GetTenantTable/GetTenantTableController';
import {GetBaseTenantSimpleListController}
	from '@copor/core/client/Components/Tenant/GetBaseTenantSimpleList/GetBaseTenantSimpleListController';

export class TenantRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetTenantTableController);
		this.post('/base/simple-list', GetBaseTenantSimpleListController);
		this.post('/simple-list', GetTenantSimpleListController);
		this.get('/search/:prompt?', SearchTenantListController);
		this.get('/base-tenant-list', GetBaseTenantListController);
		this.post('/list', GetTenantListController);
		this.get('/:id', GetTenantController);
		this.post('/', CreateTenantController);
		this.patch('/', UpdateTenantController);
		this.delete('/:id', DeleteTenantController);
	}
}
