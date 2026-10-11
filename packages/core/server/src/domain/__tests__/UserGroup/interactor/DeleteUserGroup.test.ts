import {DeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/DeleteUserGroupRepo';
import {DeleteUserGroup} from '@copor/core/domain/UserGroup/interactor/DeleteUserGroup';

describe('Delete UserGroup tests', () => {
	const mockRepo: jest.Mocked<DeleteUserGroupRepo> = {
		delete: jest.fn()
	};
	const deleteUserGroup = new DeleteUserGroup('UserGroup-id', mockRepo);

	it('Should delete a UserGroup', async () => {
		await deleteUserGroup.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('UserGroup-id');
	});
});
