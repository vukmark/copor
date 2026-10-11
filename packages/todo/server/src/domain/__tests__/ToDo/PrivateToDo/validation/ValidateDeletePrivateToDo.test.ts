import {ValidateDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateDeletePrivateToDo';
import {IsInvalidToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/IsInvalidToDoRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeletePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/validation/dto/ValidateDeletePrivateToDoDTO';

describe('Test validate delete todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<IsInvalidToDoRepo>;
	let input: ValidateDeletePrivateToDoDTO;
	let validator: ValidateDeletePrivateToDo;

	beforeEach(() => {
		input = {
			actorId: 'actor-id',
			toDoId: 'tID'
		};
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDo: jest.fn()
		};
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user has no permission to delete todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateDeletePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if todo is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		validator = new ValidateDeletePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
