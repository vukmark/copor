import {GetToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetToDoCommentRepo';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/GetToDoComment';

describe('test get to-do comment', () => {
	const mockGetCommentRepo: jest.Mocked<GetToDoCommentRepo> = {
		load: jest.fn()
	};
	const expectedResponse: GetToDoCommentDTO = {
		id: 'unique-id',
		toDoId: 'entry-id',
		content: 'content',
		createdAt: new Date(1, 1, 2001, 1, 1),
		actorId: 'creator-id'
	};

	const getComment = new GetToDoComment('unique-Id', mockGetCommentRepo);

	it('should return to-do comment', async () => {
		mockGetCommentRepo.load.mockResolvedValue(expectedResponse);
		expect(await getComment.execute()).toEqual(expectedResponse);
	});
});