import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';

import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('get role list tests', () => {
	const mockRepo: jest.Mocked<ListItems<GetRoleDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetRoleDTO[] = [
		{
			id: 'unique-id',
			name: 'name',
			type: RoleType.USER
		}
	];
	const getRoleList: GetRoleList = new GetRoleList([], mockRepo);

	it('should list all roles', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getRoleList.execute()).toEqual(expectedResponse);
	});
});
