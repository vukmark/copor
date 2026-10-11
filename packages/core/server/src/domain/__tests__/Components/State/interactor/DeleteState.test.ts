import {DeleteStateRepo} from '@copor/core/domain/Components/State/repository/DeleteStateRepo';
import {DeleteState} from '@copor/core/domain/Components/State/interactor/DeleteState';

describe('delete state tests', () => {
	const mockRepo: jest.Mocked<DeleteStateRepo> = {
		delete: jest.fn()
	};
	const deleteState: DeleteState = new DeleteState('unique-id', mockRepo);

	it('should delete a state', async () => {
		await deleteState.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
