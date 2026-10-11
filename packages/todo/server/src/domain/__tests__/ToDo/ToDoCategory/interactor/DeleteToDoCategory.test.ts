import {DeleteToDoCategoryRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/DeleteToDoCategoryRepo';
import {DeleteToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/DeleteToDoCategory';

describe('delete todo category tests', () => {
	let deleteToDoCategory: DeleteToDoCategory;
	let mockRepo: jest.Mocked<DeleteToDoCategoryRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteToDoCategory = new DeleteToDoCategory('unique-id', mockRepo);
	});
	it('should delete todo category', async () => {
		await deleteToDoCategory.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
