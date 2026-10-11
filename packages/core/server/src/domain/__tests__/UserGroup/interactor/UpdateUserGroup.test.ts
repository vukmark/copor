import {SaveUserGroupRepo} from '@copor/core/domain/UserGroup/repository/SaveUserGroupRepo';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {UpdateUserGroup} from '@copor/core/domain/UserGroup/interactor/UpdateUserGroup';

describe('update UserGroup tests', () => {
	let mockRepo: jest.Mocked<SaveUserGroupRepo>;
	let inputDTO: SaveUserGroupDTO;
	let updateUserGroup: UpdateUserGroup;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			name: 'ctk'
		};
		updateUserGroup = new UpdateUserGroup(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateUserGroup.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
