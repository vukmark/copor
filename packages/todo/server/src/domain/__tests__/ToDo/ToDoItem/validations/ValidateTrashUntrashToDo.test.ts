import {ValidateToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateToDoDTO';
import {ValidateTrashUntrashToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTrashUntrashToDo';
import {ValidateTrashUntrashToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateTrashUntrashToDoRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Test Validate Trash/Untrash todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateTrashUntrashToDoRepo>;
	let input: ValidateToDoDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDo: jest.fn()
		};
		input = {
			actorUserId: 'actor-id',
			todoId: 'todo-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
	});

	it('should throw error if todo id is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		const validator = new ValidateTrashUntrashToDo(input, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if user has no permission to trash todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateTrashUntrashToDo(input, mockPermissionRepo, mockStorageRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
