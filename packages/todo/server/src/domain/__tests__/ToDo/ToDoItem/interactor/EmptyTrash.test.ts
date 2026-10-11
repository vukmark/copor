import {EmptyTrash} from '@copor/todo/domain/ToDo/ToDoItem/interactor/EmptyTrash';
import {EmptyTrashRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/EmptyTrashRepo';

describe('Empty trash interactor', () => {
	let emptyTrash: EmptyTrash;
	let mockEmptyTrashRepo: jest.Mocked<EmptyTrashRepo>;

	beforeEach(() => {
		mockEmptyTrashRepo = {
			emptyTrash: jest.fn()
		};
		emptyTrash = new EmptyTrash(mockEmptyTrashRepo);
	});

	it('should empty trash', async () => {
		await emptyTrash.execute();
		expect(mockEmptyTrashRepo.emptyTrash).toHaveBeenCalledWith();
	});
});