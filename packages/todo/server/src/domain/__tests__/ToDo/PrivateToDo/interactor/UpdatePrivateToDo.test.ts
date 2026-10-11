import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {UpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/UpdatePrivateToDo';
import {SavePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/SavePrivateToDoRepo';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('Update todo tests', () => {
	let mockRepo: jest.Mocked<SavePrivateToDoRepo>;
	let input: SavePrivateToDoDTO;
	let updateToDo: UpdatePrivateToDo;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};

		input = {
			id: 'some-id',
			title: 'todo',
			actorId: 'creator-id',
			progress: Progress.TO_DO,
			priority: Priority.HIGH,
			isDisplayedInCalendar: true,
			isPinned: false
		};

		updateToDo = new UpdatePrivateToDo(input, mockRepo);
	});

	it('Should save updated data for todo', async () => {
		await updateToDo.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
