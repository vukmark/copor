import {CreateUserGroup} from '@copor/core/domain/UserGroup/interactor/CreateUserGroup';
import {SaveUserGroupRepo} from '@copor/core/domain/UserGroup/repository/SaveUserGroupRepo';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';

describe('Create UserGroup tests', () => {
	let createUserGroup: CreateUserGroup;
	let mockRepo: jest.Mocked<SaveUserGroupRepo>;
	let input: SaveUserGroupDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			name: 'group ctk',
			parentUserGroupId: 'pid'
		};
		createUserGroup = new CreateUserGroup(input, mockRepo);
	});

	it('Should save an UserGroup', async () => {
		const result = await createUserGroup.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});