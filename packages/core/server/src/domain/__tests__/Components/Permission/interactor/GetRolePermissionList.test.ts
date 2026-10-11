import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {GetRolePermissionList} from '@copor/core/domain/Components/Permission/interactor/GetRolePermissionList';
import {GetRolePermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetRolePermissionListRepo';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('get permission list for role interactor tests', () => {
	const mockRepo: jest.Mocked<GetRolePermissionListRepo> = {
		list: jest.fn()
	};
	const expectedResponse = [
		{permissionType: CorePermission.canArchiveUser, scope: PermissionScope.ALL, effect: PermissionEffect.ALLOW}
	];
	const getRolePermissionList: GetRolePermissionList = new GetRolePermissionList('roleId', mockRepo);

	it('should get all permissions for given role', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getRolePermissionList.execute()).toEqual(expectedResponse);
	});
});
