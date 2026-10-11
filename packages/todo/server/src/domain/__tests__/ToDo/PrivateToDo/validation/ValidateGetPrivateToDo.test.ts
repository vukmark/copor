import {ValidateToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateToDoDTO';
import {ValidateGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateGetPrivateToDo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';

describe('test validate get todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user has no permission to get todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const inputDTO: ValidateToDoDTO = {
			actorUserId: 'actor-id',
			todoId: 'todo-id'
		};
		const validator = new ValidateGetPrivateToDo(inputDTO, mockPermissionRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});