import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {GetAllPermissionsForUserRepo} from '@copor/core/domain/Components/Permission/repository/GetAllPermissionsForUserRepo';
import {GetAllPermissionsForUser} from '@copor/core/domain/Components/Permission/interactor/GetAllPermissionsForUser';

describe('get all permission for user interactor tests', () => {
	const mockRepo: jest.Mocked<GetAllPermissionsForUserRepo> = {
		list: jest.fn()
	};
	const expectedResponse = [
		{permissionType: CorePermission.canGetAllPermissions, scope: PermissionScope.ALL, effect: PermissionEffect.ALLOW}
	];
	const getAllPermissions: GetAllPermissionsForUser = new GetAllPermissionsForUser('userId', mockRepo);

	it('should get all permissions for given user', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getAllPermissions.execute()).toEqual(expectedResponse);
	});
});
