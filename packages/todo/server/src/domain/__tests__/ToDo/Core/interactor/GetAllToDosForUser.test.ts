import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {GetAllToDosForUser} from '@copor/todo/domain/ToDo/Core/interactor/GetAllToDosForUser';
import {GetAllToDosForUserRepo} from '@copor/todo/domain/ToDo/Core/repository/GetAllToDosForUserRepo';
import {GetAllToDosForUserDTO} from '@copor/todo/domain/ToDo/Core/interactor/dto/GetAllToDosForUserDTO';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

describe('get all todos for user interactor tests', () => {
	const mockRepo: jest.Mocked<GetAllToDosForUserRepo> = {
		load: jest.fn()
	};
	const expectedResponse: GetAllToDosForUserDTO[] = [
		{
			id: 'unique-id',
			title: 'todo',
			isPrivate: true,
			priority: Priority.HIGH,
			isDisplayedInCalendar: true,
			isPinned: false,
			type: ToDoType.PRIVATE
		}
	];
	const getAllToDosForUser: GetAllToDosForUser
		= new GetAllToDosForUser({userId: 'userId', filterList: [{name: 'filter', values: []}]}, mockRepo);

	it('should return expected result', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getAllToDosForUser.execute()).toEqual(expectedResponse);
	});
});
