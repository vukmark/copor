import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserList} from '@copor/core/domain/User/interactor/GetUserList';

describe('get user list', () => {
	const mockRepo: jest.Mocked<ListItems<GetUserDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetUserDTO[] = [{
		id: 'id',
		role: 'role',
		userName: 'userName',
		isDefaultRole: true,
		isActive: true,
		firstName: 'firstname',
		lastName: 'last',
		email: 'user@example.com',
		imageName: 'some/path'
	}];

	const interactor: GetUserList = new GetUserList([], mockRepo);

	it('should return list of users', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});