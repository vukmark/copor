import {ValidateCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateCreateAttachmentForToDo';
import {ValidateCreateAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateCreateAttachmentForToDoRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {ForbiddenToDoAttachmentAccessException} from '@copor/todo/domain/ToDo/ToDoItem/exception/ForbiddenToDoAttachmentAccessException';
import {SaveAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SaveAttachmentForToDoDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate create attachment for todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateAttachmentForToDoRepo>;
	let validator : ValidateCreateAttachmentForToDo;
	let input: SaveAttachmentForToDoDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDo: jest.fn(),
			isForbiddenToDoAttachmentAccess: jest.fn()
		};
		input = {
			id: 'uniqueId',
			actorId: 'user-id',
			name: 'file-name.pdf',
			size: 1024,
			creationDateTime: new Date(2012, 10, 10),
			todoId: 'some-todo-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
		mockStorageRepo.isForbiddenToDoAttachmentAccess.mockResolvedValue(false);
	});

	it('Should throw error if does not have permission to add attachment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if todo is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		validator = new ValidateCreateAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if actor does not have access to the todo', async () => {
		const errorList = new ErrorList([new ForbiddenToDoAttachmentAccessException()]);

		mockStorageRepo.isForbiddenToDoAttachmentAccess.mockResolvedValue(true);
		validator = new ValidateCreateAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
