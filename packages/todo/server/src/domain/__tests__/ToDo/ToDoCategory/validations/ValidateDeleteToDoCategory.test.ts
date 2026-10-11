import {ValidateDeleteToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateDeleteToDoCategory';
import {
	ValidateDeleteToDoCategoryInputDTO
} from '@copor/todo/domain/ToDo/ToDoCategory/validations/dto/ValidateDeleteToDoCategoryInputDTO';
import {ValidateDeleteToDoCategoryRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/ValidateDeleteToDoCategoryRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidToDoCategoryException} from '@copor/todo/domain/ToDo/ToDoCategory/exception/InvalidToDoCategoryException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate delete todo category tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteToDoCategoryRepo>;
	const inputDTO: ValidateDeleteToDoCategoryInputDTO = {
		actorId: 'actor-id',
		toDoCategoryId: 'cat-id'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDoCategory: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDoCategory.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to delete todo category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteToDoCategory(inputDTO, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should not throw error if user is allowed to delete todo category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		const validator = new ValidateDeleteToDoCategory(inputDTO, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).not.toStrictEqual(errorList);
	});

	it('should throw if todo category is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoCategoryException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDoCategory.mockResolvedValue(true);
		const validator = new ValidateDeleteToDoCategory(inputDTO, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
