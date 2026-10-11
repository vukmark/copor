import {TrashToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/TrashToDoRepo';
import {TrashToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/TrashToDo';

describe('Trash todo interactor', () => {
	let trashEntry: TrashToDo;
	let mockTrashEntryRepo: jest.Mocked<TrashToDoRepo>;

	beforeEach(() => {
		mockTrashEntryRepo = {
			trashToDo: jest.fn()
		};
		trashEntry = new TrashToDo('unique-id', mockTrashEntryRepo);
	});

	it('should trash todo', async () => {
		await trashEntry.execute();
		expect(mockTrashEntryRepo.trashToDo).toHaveBeenCalledWith('unique-id');
	});
});