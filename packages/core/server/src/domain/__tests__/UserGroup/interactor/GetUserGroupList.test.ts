import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {GetUserGroupList} from '@copor/core/domain/UserGroup/interactor/GetUserGroupList';

describe('Get list of activity types', () => {
	const mockRepo: jest.Mocked<ListItems<GetUserGroupDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetUserGroupDTO[] = [{
		id: 'unique-id',
		name: 'group',
		isSpecial: true
	}];
	const getUserGroupList: GetUserGroupList = new GetUserGroupList([], mockRepo);

	it('Should list all UserGroup', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getUserGroupList.execute()).toEqual(expectedResponse);
	});
});