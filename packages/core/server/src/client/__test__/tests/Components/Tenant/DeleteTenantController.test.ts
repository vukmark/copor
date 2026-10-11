import {testController} from '../../../testHelper/Controller.helper';
import {DeleteTenantController, DeleteTenantParams} from '../../../../Components/Tenant/DeleteTenant/DeleteTenantController';

describe('test DeleteTenant', () => {
	const deleteTenantRequestParams: DeleteTenantParams = {
		id: '1'
	};

	testController(DeleteTenantController, undefined, deleteTenantRequestParams);
});