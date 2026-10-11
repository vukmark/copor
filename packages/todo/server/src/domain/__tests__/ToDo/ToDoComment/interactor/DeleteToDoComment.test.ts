import {DeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/DeleteToDoComment';
import {DeleteToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/DeleteToDoCommentRepo';

describe('delete to-do comment tests', () => {
	let deleteComment: DeleteToDoComment;
	let mockRepo: jest.Mocked<DeleteToDoCommentRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteComment = new DeleteToDoComment('unique-id', mockRepo);
	});

	it('should delete to-do comment', async () => {
		await deleteComment.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});