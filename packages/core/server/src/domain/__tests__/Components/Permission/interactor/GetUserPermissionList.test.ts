import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {GetUserSpecificPermissionList} from '../../../../Components/Permission/interactor/GetUserSpecificPermissionList';
import {GetUserSpecificPermissionListRepo} from '../../../../Components/Permission/repository/GetUserSpecificPermissionListRepo';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('get user list for role interactor tests', () => {
	const mockRepo: jest.Mocked<GetUserSpecificPermissionListRepo> = {
		list: jest.fn()
	};
	const expectedResponse = [
		{permissionType: CorePermission.canArchiveUser, scope: PermissionScope.ALL, effect: PermissionEffect.ALLOW}
	];
	const getUserPermissionList: GetUserSpecificPermissionList = new GetUserSpecificPermissionList('roleId', mockRepo);

	it('should get all permissions for given user', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getUserPermissionList.execute()).toEqual(expectedResponse);
	});
});
