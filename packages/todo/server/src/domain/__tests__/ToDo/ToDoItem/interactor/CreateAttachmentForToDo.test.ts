import {CreateAttachmentToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/CreateAttachmentToToDoRepo';
import {CreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/CreateAttachmentForToDo';
import {SaveAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SaveAttachmentForToDoDTO';

describe('Test add attachment to todo', () => {
	let input: SaveAttachmentForToDoDTO;
	let mockRepo: jest.Mocked<CreateAttachmentToToDoRepo>;

	beforeEach(() => {
		input = {
			id: 'uniqueId',
			name: 'some-file-name.pdf',
			size: 4096,
			todoId: 'some-todo-id',
			actorId: 'some-id',
			creationDateTime: new Date(2020, 1, 10)
		};
		mockRepo = {
			save: jest.fn(),
			getNewId: jest.fn()
		};
	});

	it('Should save an attachment for a to-do', async() => {
		const saveDTO: SaveAttachmentForToDoDTO = {
			id: 'uniqueId',
			name: 'some-file-name.pdf',
			size: 4096,
			todoId: 'some-todo-id',
			actorId: 'some-id',
			creationDateTime: new Date(2020, 1, 10)
		};

		mockRepo.getNewId.mockResolvedValue('uniqueId');
		const result = new CreateAttachmentForToDo(input, mockRepo);

		expect(await result.execute()).toEqual('uniqueId');
		expect(mockRepo.save).toHaveBeenCalledWith(saveDTO);
	});
});