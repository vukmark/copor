import {DeleteUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/DeleteUserPreferences';
import {DeleteUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/DeleteUserPreferencesRepo';

describe('delete user preferences interactor tests', () => {
	const mockRepo: jest.Mocked<DeleteUserPreferencesRepo> = {
		delete: jest.fn()
	};
	const deleteUserPreferences: DeleteUserPreferences = new DeleteUserPreferences('id', mockRepo);

	it('should delete user preferences', async () => {
		await deleteUserPreferences.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('id');
	});
});
