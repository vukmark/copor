import {SaveUserDTO} from '@copor/core/domain/User/interactor/dto/SaveUserDTO';
import {UpdateUserRepo} from '@copor/core/domain/User/repository/UpdateUserRepo';
import {UpdateUser} from '@copor/core/domain/User/interactor/UpdateUser';

describe('update user test', () => {
	const mockRepo: jest.Mocked<UpdateUserRepo> = {
		update: jest.fn()
	};
	const input: SaveUserDTO = {
		id: 'id',
		authUser: 'authUser',
		role: 'role',
		isDefaultRole: true,
		isActive: true,
		actorId: 'actorId'
	};

	const updateUser: UpdateUser = new UpdateUser(input, mockRepo);

	it('should update the user', async () => {
		await updateUser.execute();
		expect(mockRepo.update).toHaveBeenCalledWith(input);
	});
});