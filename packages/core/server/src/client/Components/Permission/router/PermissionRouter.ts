import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {SetPermissionListToRoleController} from '../SetPermissionListToRole/SetPermissionListToRoleController';
import {SetPermissionListToUserController} from '../SetPermissionListToUser/SetPermissionListToUserController';
import {GetRolePermissionListController} from '../GetRolePermissionList/GetRolePermissionListController';
import {GetUserSpecificPermissionListController}
	from '@copor/core/client/Components/Permission/GetUserSpecificPermissionList/GetUserSpecificPermissionListController';
import {
	GetUserCompletePermissionListController
} from '@copor/core/client/Components/Permission/GetUserCompletePermissionList/GetUserCompletePermissionListController';
import {
	SetPermissionListToUserGroupController
} from '@copor/core/client/Components/Permission/SetPermissionListToUserGroup/SetPermissionListToUserGroupController';
import {
	GetUserGroupPermissionListController
} from '@copor/core/client/Components/Permission/GetUserGroupPermissionList/GetUserGroupPermissionListController';
import {GetPermissionTreeController} from '@copor/core/client/Components/Permission/GetPermissionTree/GetPermissionTreeController';
import {
	SearchRolePermissionListController
} from '@copor/core/client/Components/Permission/GetRolePermissionList/SearchRolePermissionListController';
import {
	SearchUserGroupPermissionListController
} from '@copor/core/client/Components/Permission/GetUserGroupPermissionList/SearchUserGroupPermissionListController';
import {
	SearchPermissionTreeController
} from '@copor/core/client/Components/Permission/GetPermissionTree/SearchPermissionTreeController';
import {
	CheckRolePermissionDependenciesController
} from '@copor/core/client/Components/Permission/CheckRolePermissionDependencies/CheckRolePermissionDependenciesController';
//AUTO_IMPORT_DO_NOT_EDIT

export class PermissionRouter extends BaseRouter {
	protected initializeRoutes(): void {
	//AUTO_INSERT_DO_NOT_EDIT
		this.post('/role/', SetPermissionListToRoleController);
		this.post('/user/', SetPermissionListToUserController);
		this.post('/user-group/', SetPermissionListToUserGroupController);
		this.post('/', SetPermissionListToRoleController);
		this.post('/tree', SearchPermissionTreeController);
		this.get('/tree', GetPermissionTreeController);
		// Must stay above /role/:roleId, otherwise that param route swallows this path.
		this.post('/role/validate', CheckRolePermissionDependenciesController);
		this.post('/role/:roleId', SearchRolePermissionListController);
		this.get('/role/:roleId', GetRolePermissionListController);
		this.get('/user/all', GetUserCompletePermissionListController);
		this.get('/user/:userId', GetUserSpecificPermissionListController);
		this.post('/user-group/:userGroupId', SearchUserGroupPermissionListController);
		this.get('/user-group/:userGroupId', GetUserGroupPermissionListController);
	}
}
