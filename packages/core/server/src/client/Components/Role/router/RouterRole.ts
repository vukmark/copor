import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateRoleController} from '../CreateRole/CreateRoleController';
import {UpdateRoleController} from '../UpdateRole/UpdateRoleController';
import {DeleteRoleController} from '../DeleteRole/DeleteRoleController';
import {GetRoleController} from '../GetRole/GetRoleController';
import {GetRoleListController} from '../GetRoleList/GetRoleListController';
import {GetRoleByRoleTypeController} from '@copor/core/client/Components/Role/GetRoleByRoleType/GetRoleByRoleTypeController';
import {GetRoleSimpleListController} from '@copor/core/client/Components/Role/GetRoleSimpleList/GetRoleSimpleListController';
import {GetRoleFormController} from '@copor/core/client/Components/Role/GetRoleForm/GetRoleFormController';
import {GetRoleTableController} from '@copor/core/client/Components/Role/GetRoleTable/GetRoleTableController';
//AUTO_IMPORT_DO_NOT_EDIT

export class RoleRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/table', GetRoleTableController);
		this.get('/form', GetRoleFormController);
		this.post('/list', GetRoleListController);
		this.post('/simple-list', GetRoleSimpleListController);
		this.get('/type/:type', GetRoleByRoleTypeController);
		this.get('/:id', GetRoleController);
		this.delete('/:id', DeleteRoleController);
		this.patch('/', UpdateRoleController);
		this.post('/', CreateRoleController);
		this.get('/form/:id', GetRoleFormController);
	}
}