import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {GetUserGroup} from '@copor/core/domain/UserGroup/interactor/GetUserGroup';
import {GetUserGroupRepo} from '@copor/core/domain/UserGroup/repository/GetUserGroupRepo';

describe('Get UserGroup tests', () => {
	const mockRepo: jest.Mocked<GetUserGroupRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetUserGroupDTO = {
		id: 'unique-id',
		name: 'grupa ciganka te kupa',
		isSpecial: false
	};
	const getUserGroup: GetUserGroup = new GetUserGroup('unique-id', mockRepo);

	it('Should return UserGroup based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getUserGroup.execute()).toEqual(expectedResponse);
	});
});