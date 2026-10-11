import {GetAllCommentsForToDoRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetAllCommentsForToDoRepo';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetAllCommentsForToDo} from '@copor/todo/domain/ToDo/ToDoComment/interactor/GetAllCommentsForToDo';

describe('Get list of comments for to do', () => {
	const mockRepo: jest.Mocked<GetAllCommentsForToDoRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetToDoCommentDTO[] = [{
		id: 'unique-id',
		createdAt: new Date(),
		content: 'contents',
		toDoId: 'todo-id',
		actorId: 'actorId'
	}];
	const getCommentList: GetAllCommentsForToDo = new GetAllCommentsForToDo('id', mockRepo);

	it('Should list all comments fo to do', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getCommentList.execute()).toEqual(expectedResponse);
	});
});