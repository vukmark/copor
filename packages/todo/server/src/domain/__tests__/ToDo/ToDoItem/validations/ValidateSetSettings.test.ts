import {ValidateSetSettings} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateSetSettings';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateToDoDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Test validate changing default settings for todos', () => {
	let mockRepo: jest.Mocked<PermissionRepository>;
	let input: ValidateToDoDTO;

	beforeEach(() => {
		mockRepo = {
			isAllowed: jest.fn()
		};
		input = {
			actorUserId: 'actor-id',
			todoId: 'todo-id'
		};
		mockRepo.isAllowed.mockResolvedValue(true);
	});
	it('Should throw error if user has no permission to set settings', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateSetSettings(input, mockRepo);

		mockRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});