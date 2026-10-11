import {CreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/CreateToDoComment';
import {SaveToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/SaveToDoCommentRepo';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';

describe('create todo comment tests', () => {
	let createToDoComment: CreateToDoComment;
	let mockRepo: jest.Mocked<SaveToDoCommentRepo>;
	const inputDto: SaveToDoCommentDTO = {
		id: 'unique-id',
		toDoId: 'unique-id',
		content: 'content',
		createdAt: new Date(1, 1, 2001, 1, 1),
		actorId: 'actor-id'
	};

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		createToDoComment = new CreateToDoComment(inputDto, mockRepo);
	});
	it('should create new todo comment', async () => {
		const saveDTO: SaveToDoCommentDTO = {
			id: 'unique-id',
			toDoId: 'unique-id',
			content: 'content',
			createdAt: new Date(1, 1, 2001, 1, 1),
			actorId: 'actor-id'
		};
		const result = await createToDoComment.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(saveDTO);
	});
});
