import {DeleteRoleRepo} from '@copor/core/domain/Components/Role/repository/DeleteRoleRepo';
import {DeleteRole} from '@copor/core/domain/Components/Role/interactor/DeleteRole';

describe('delete role tests', () => {
	let deleteRole: DeleteRole;
	let mockRepo: jest.Mocked<DeleteRoleRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteRole = new DeleteRole('unique-id', mockRepo);
	});


	it('should delete a role', async () => {
		await deleteRole.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
