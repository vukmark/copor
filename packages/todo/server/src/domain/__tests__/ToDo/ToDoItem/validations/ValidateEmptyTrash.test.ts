import {ValidateEmptyTrash} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateEmptyTrash';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateToDoDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Test validate empty trash', () => {
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

	it('Should throw error if user has no permission to trash entry', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateEmptyTrash(input, mockRepo);

		mockRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});