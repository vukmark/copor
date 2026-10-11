import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserGroupTree} from '@copor/core/domain/UserGroup/interactor/GetUserGroupTree';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';

describe('Get list of activity types', () => {
	const mockRepo: jest.Mocked<ListItems<GetUserGroupTreeDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetUserGroupTreeDTO[] = [{
		id: 'unique-id',
		name: 'group',
		canEditName: true,
		canEditMembers: true,
		canCreateChildren: true,
		children: []
	}];
	const getUserGroupTree: GetUserGroupTree = new GetUserGroupTree([], mockRepo);

	it('Should list all UserGroup', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getUserGroupTree.execute()).toEqual(expectedResponse);
	});
});