import {AssignUsersToToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/AssignUsersToToDoDTO';
import {ValidateAssignUsersToToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateAssignUsersToToDo';
import {ValidateAssignUsersToToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateAssignUsersToToDoRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyIDInListException} from '@copor/core/domain/Core/Exceptions/empty/EmptyIDInListException';
import {InvalidUserListException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidUserListException';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('assign users to todo validation tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateAssignUsersToToDoRepo>;
	let inputDTO: AssignUsersToToDoDTO;
	let validator: ValidateAssignUsersToToDo;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidToDo: jest.fn(),
			isInvalidUserList: jest.fn()
		};

		inputDTO = {
			actorId: 'aID',
			userIds: ['uID-1', 'uID-2', 'uID-3'],
			todoId: 'tID'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
		mockStorageRepo.isInvalidUserList.mockResolvedValue(false);
	});

	it('should throw error if user doesnt have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateAssignUsersToToDo(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if one of the provided user ids is an empty string', async () => {
		inputDTO.userIds[1] = '';
		const errorList = new ErrorList([new EmptyIDInListException()]);

		validator = new ValidateAssignUsersToToDo(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if one of user ids is invalid', async () => {
		mockStorageRepo.isInvalidUserList.mockResolvedValue(true);
		const errorList = new ErrorList([new InvalidUserListException()]);

		validator = new ValidateAssignUsersToToDo(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if todo is invalid', async () => {
		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		const errorList = new ErrorList([new InvalidToDoException()]);

		validator = new ValidateAssignUsersToToDo(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
