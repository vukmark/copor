import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {SetPermissionListToRole} from '@copor/core/domain/Components/Permission/interactor/SetPermissionListToRole';
import {SetPermissionListToRoleDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {SetPermissionListToRoleRepo} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToRoleRepo';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('give permissions to a role', () => {
	let setPermissionListToRole: SetPermissionListToRole;
	let mockRepo: jest.Mocked<SetPermissionListToRoleRepo>;
	let input: SetPermissionListToRoleDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			roleId: 'someId',
			permissionList: [
				{
					permissionType: CorePermission.canCreateRole,
					scope: PermissionScope.ALL,
					effect: PermissionEffect.ALLOW
				}
			],
			actorId: 'aId'
		};
		setPermissionListToRole = new SetPermissionListToRole(input, mockRepo);
	});

	it('should save new PermissionList for a role', async () => {
		const result = await setPermissionListToRole.execute();

		expect(result).toBeUndefined();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});