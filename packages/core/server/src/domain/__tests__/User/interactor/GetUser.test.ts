import {GetUser} from '@copor/core/domain/User/interactor/GetUser';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

describe('get user by id', () => {
	const mockRepo: jest.Mocked<GetItem<GetUserDTO>> = {
		load: jest.fn()
	};

	const interactor = new GetUser('unique-id', mockRepo);

	it('should return user with provided id', async () => {
		const expectedResponse: GetUserDTO = {
			userName: 'userName',
			id: 'id',
			role: 'role',
			isDefaultRole: true,
			isActive: true,
			firstName: 'firstname',
			lastName: 'last',
			email: 'user@example.com',
			imageName: 'some/path'
		};

		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});