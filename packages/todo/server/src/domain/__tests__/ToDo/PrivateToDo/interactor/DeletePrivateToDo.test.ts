import {DeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/DeletePrivateToDo';
import {DeletePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/DeletePrivateToDoRepo';

describe('delete todo tests', () => {
	let deleteEntry: DeletePrivateToDo;
	let mockRepo: jest.Mocked<DeletePrivateToDoRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteEntry = new DeletePrivateToDo('unique-id', mockRepo);
	});

	it('should delete todo', async () => {
		await deleteEntry.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});