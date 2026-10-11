import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateUserGroupController} from '@copor/core/client/UserGroup/CreateUserGroup/CreateUserGroupController';
import {DeleteUserGroupController} from '@copor/core/client/UserGroup/DeleteUserGroup/DeleteUserGroupController';
import {UpdateUserGroupController} from '@copor/core/client/UserGroup/UpdateUserGroup/UpdateUserGroupController';
import {GetUserGroupController} from '@copor/core/client/UserGroup/GetUserGroup/GetUserGroupController';
import {GetUserGroupTreeController} from '@copor/core/client/UserGroup/GetUserGroupTree/GetUserGroupTreeController';
import {SetUserGroupUserListController} from '@copor/core/client/UserGroup/SetUserGroupUserList/SetUserGroupUserListController';
import {AddUserToUserGroupController} from '@copor/core/client/UserGroup/AddUserToUserGroup/AddUserToUserGroupController';
import {GetUserGroupListController} from '@copor/core/client/UserGroup/GetUserGroupList/GetUserGroupListController';
import {
	GetUpdateUserGroupFormController
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/GetUpdateUserGroupFormController';
import {
	GetCreateUserGroupFormController
} from '@copor/core/client/UserGroup/GetCreateUserGroupForm/GetCreateUserGroupFormController';
import {
	GetUserGroupUserListController
} from '@copor/core/client/UserGroup/GetUserGroupUserList/GetUserGroupUserListController';

export class UserGroupRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateUserGroupController);
		this.delete('/:id', DeleteUserGroupController);
		this.get('/list', GetUserGroupListController);
		this.get('/form', GetCreateUserGroupFormController);
		this.get('/:id', GetUserGroupController);
		this.patch('/', UpdateUserGroupController);
		this.get('/', GetUserGroupTreeController);
		this.post('/set-users', SetUserGroupUserListController);
		this.post('/add-user', AddUserToUserGroupController);
		this.post('/get-users', GetUserGroupUserListController);
		this.get('/form/:id', GetUpdateUserGroupFormController);
	}
}