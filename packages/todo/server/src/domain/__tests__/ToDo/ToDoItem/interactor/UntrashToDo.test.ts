import {UntrashToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/UntrashToDoRepo';
import {UntrashToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/UntrashToDo';

describe('Untrash todo interactor', () => {
	let untrashEntry: UntrashToDo;
	let mockUntrashEntryRepo: jest.Mocked<UntrashToDoRepo>;

	beforeEach(() => {
		mockUntrashEntryRepo = {
			untrashToDo: jest.fn()
		};
		untrashEntry = new UntrashToDo('unique-id', mockUntrashEntryRepo);
	});

	it('should untrash todo', async () => {
		await untrashEntry.execute();
		expect(mockUntrashEntryRepo.untrashToDo).toHaveBeenCalledWith('unique-id');
	});
});