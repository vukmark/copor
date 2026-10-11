import {CreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/CreatePrivateToDo';
import {SavePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/SavePrivateToDoRepo';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('Test Create new todo', () => {
	let entry: CreatePrivateToDo;
	let mockEntryRepo: jest.Mocked<SavePrivateToDoRepo>;

	const inputDTO: SavePrivateToDoDTO = {
		id: 'unique-id',
		title: 'todo',
		actorId: 'creator-id',
		progress: Progress.TO_DO,
		priority: Priority.HIGH,
		isDisplayedInCalendar: true,
		isPinned: false
	};

	beforeEach(() => {
		mockEntryRepo = {
			save: jest.fn()
		};
		entry = new CreatePrivateToDo(inputDTO, mockEntryRepo);
	});

	describe('test execute', () => {
		it('should save the todo', async () => {
			const saveDTO: SavePrivateToDoDTO = {
				id: 'unique-id',
				title: 'todo',
				actorId: 'creator-id',
				progress: Progress.TO_DO,
				priority: Priority.HIGH,
				isDisplayedInCalendar: true,
				isPinned: false
			};
			const result = await entry.execute();

			expect(result).toEqual('unique-id');
			expect(mockEntryRepo.save).toHaveBeenCalledWith(saveDTO);
		});
	});
});
