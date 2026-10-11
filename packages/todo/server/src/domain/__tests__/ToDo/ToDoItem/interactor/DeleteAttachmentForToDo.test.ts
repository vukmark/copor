import {DeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/DeleteAttachmentForToDo';
import {DeleteAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/DeleteAttachmentForToDoRepo';

describe('Test deletion of an attachment for a todo', () => {
	let deleteAttachmentForTodo: DeleteAttachmentForToDo;
	let mockRepo: jest.Mocked<DeleteAttachmentForToDoRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteAttachmentForTodo = new DeleteAttachmentForToDo('unique-attachment-id', mockRepo);
	});

	it('Should delete attachment of an Todo', async () => {
		await deleteAttachmentForTodo.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-attachment-id');
	});
});