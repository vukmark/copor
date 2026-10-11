import {ValidateUpdateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateUpdateToDoCategory';
import {ValidateUpdateToDoCategoryRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/ValidateUpdateToDoCategoryRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyTitleException} from '@copor/core/domain/Core/Exceptions/empty/EmptyTitleException';
import {InvalidToDoCategoryException} from '@copor/todo/domain/ToDo/ToDoCategory/exception/InvalidToDoCategoryException';
import {SaveToDoCategoryDTO} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/dto/SaveToDoCategoryDTO';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate update todo category tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateUpdateToDoCategory;
	let input: SaveToDoCategoryDTO;
	let mockStorageRepo: jest.Mocked<ValidateUpdateToDoCategoryRepo>;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDoCategory: jest.fn()
		};
		input = {
			id: 'id',
			name: 'name',
			createdOn: new SimpleDate(2, 2, 2005),
			description: 'description',
			actorId: 'creator-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDoCategory.mockResolvedValue(false);
	});

	it('should throw error if it is not allowed to update todo category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateToDoCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyTitleException()]);

		input.name = '';
		validator = new ValidateUpdateToDoCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if category id is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoCategoryException()]);

		mockStorageRepo.isInvalidToDoCategory.mockResolvedValue(true);
		validator = new ValidateUpdateToDoCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
