import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {UpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/UpdateToDoComment';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

describe('update todo comment tests', () => {
	const mockRepo: jest.Mocked<SaveItem<SaveToDoCommentDTO>> = {
		save: jest.fn()
	};

	const input: SaveToDoCommentDTO = {
		id: 'id',
		toDoId: 'tID',
		content: 'content',
		createdAt: new Date(1, 2, 2005, 14, 14),
		actorId: 'cID'
	};

	const updateComment = new UpdateToDoComment(input, mockRepo);

	it('should successfully save updated comment', async () => {
		await updateComment.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
