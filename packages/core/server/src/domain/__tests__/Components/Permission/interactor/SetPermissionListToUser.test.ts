import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {SetPermissionListToUser} from '@copor/core/domain/Components/Permission/interactor/SetPermissionListToUser';
import {SetPermissionListToUserDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserDTO';
import {SetPermissionListToUserRepo} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserRepo';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('give permissions to a user', () => {
	let setPermissionListToUser: SetPermissionListToUser;
	let mockRepo: jest.Mocked<SetPermissionListToUserRepo>;
	let input: SetPermissionListToUserDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			userId: 'someId',
			permissionList: [
				{
					permissionType: CorePermission.canCreateUser,
					scope: PermissionScope.ALL,
					effect: PermissionEffect.ALLOW
				}
			],
			actorId: 'aId'
		};
		setPermissionListToUser = new SetPermissionListToUser(input, mockRepo);
	});

	it('should save new PermissionList for a user', async () => {
		const result = await setPermissionListToUser.execute();

		expect(result).toBeUndefined();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});