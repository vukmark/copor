import {ValidateGetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateGetAttachmentForToDo';
import {ValidateGetAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/ValidateGetAttachmentForToDoRepo';
import {ValidateGetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateGetAttachmentForToDoDTO';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidToDoAttachmentException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoAttachmentException';
import {ForbiddenToDoAttachmentAccessException} from '@copor/todo/domain/ToDo/ToDoItem/exception/ForbiddenToDoAttachmentAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate get attachment for todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetAttachmentForToDoRepo>;
	let input: ValidateGetAttachmentForToDoDTO;
	let validator: ValidateGetAttachmentForToDo;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDoAttachment: jest.fn(),
			isForbiddenAttachmentForToDoAccess: jest.fn()
		};
		input = {
			id: 'attachment-id',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDoAttachment.mockResolvedValue(false);
		mockStorageRepo.isForbiddenAttachmentForToDoAccess.mockResolvedValue(false);
	});

	it('Should throw error if user has no permission to get the attachment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if attachment is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoAttachmentException()]);

		mockStorageRepo.isInvalidToDoAttachment.mockResolvedValue(true);
		validator = new ValidateGetAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if actor does not have access to the attachment\'s todo', async () => {
		const errorList = new ErrorList([new ForbiddenToDoAttachmentAccessException()]);

		mockStorageRepo.isForbiddenAttachmentForToDoAccess.mockResolvedValue(true);
		validator = new ValidateGetAttachmentForToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
