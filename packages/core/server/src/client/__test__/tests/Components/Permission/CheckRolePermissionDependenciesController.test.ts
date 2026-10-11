import {
	CheckRolePermissionDependenciesController
} from '../../../../Components/Permission/CheckRolePermissionDependencies/CheckRolePermissionDependenciesController';
import {
	CheckRolePermissionDependenciesReqBodyDTO
} from '../../../../Components/Permission/CheckRolePermissionDependencies/dto/CheckRolePermissionDependenciesReqBodyDTO';
import {testController} from '../../../testHelper/Controller.helper';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('test CheckRolePermissionDependenciesController', () => {
	const requestBody: CheckRolePermissionDependenciesReqBodyDTO = {
		roleId: 'role-1',
		permissionList: [
			{
				permissionType: CorePermission.canGetUserList,
				scope: PermissionScope.ALL,
				effect: PermissionEffect.ALLOW
			}
		]
	};

	testController(CheckRolePermissionDependenciesController, requestBody, undefined);
});
