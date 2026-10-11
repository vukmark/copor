import {AssignUsersToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/AssignUsersToToDoRepo';
import {AssignUsersToToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/AssignUsersToToDo';
import {AssignUsersToToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/AssignUsersToToDoDTO';

describe('assign users to to-do interactor', () => {
	const mockRepo: jest.Mocked<AssignUsersToToDoRepo> = {
		assignUsersToToDo: jest.fn()
	};
	const inputDTO: AssignUsersToToDoDTO = {
		actorId: 'aID',
		userIds: ['uID-1', 'uID-2', 'uID-3'],
		todoId: 'tID'
	};
	const assignUsersToTask: AssignUsersToToDo = new AssignUsersToToDo(inputDTO, mockRepo);

	it('should successfully assign users', async () => {
		await assignUsersToTask.execute();
		expect(mockRepo.assignUsersToToDo).toHaveBeenCalledWith(inputDTO.userIds, inputDTO.todoId);
	});
});