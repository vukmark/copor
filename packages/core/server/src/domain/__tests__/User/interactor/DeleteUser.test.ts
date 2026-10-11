import {DeleteUserRepo} from '@copor/core/domain/User/repository/DeleteUserRepo';
import {DeleteUser} from '@copor/core/domain/User/interactor/DeleteUser';

describe('delete user tests', () => {
	const mockRepo: jest.Mocked<DeleteUserRepo> = {
		delete: jest.fn()
	};

	const interactor: DeleteUser = new DeleteUser('uniqueId', mockRepo);

	it('should successfully delete user', async () => {
		await interactor.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('uniqueId');
	});
});