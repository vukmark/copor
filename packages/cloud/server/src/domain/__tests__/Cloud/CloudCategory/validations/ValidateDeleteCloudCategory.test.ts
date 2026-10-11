import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCloudCategoryException} from '@copor/cloud/domain/Cloud/CloudCategory/exception/InvalidCloudCategoryException';
import {ValidateDeleteCloudCategory}
	from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateDeleteCloudCategory';
import {ValidateDeleteCloudCategoryDTO}
	from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateDeleteCloudCategoryDTO';
import {ValidateDeleteCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateDeleteCloudCategoryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete cloud category test', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteCloudCategoryRepo>;
	let input: ValidateDeleteCloudCategoryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCloudCategory: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'user-id',
			cloudCategoryId: 'unique-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCloudCategory.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to delete cloud category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateDeleteCloudCategory = new ValidateDeleteCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if cloud category id is invalid', async () => {
		const errorList = new ErrorList([new InvalidCloudCategoryException()]);

		mockStorageRepo.isInvalidCloudCategory.mockResolvedValue(true);
		const validator: ValidateDeleteCloudCategory = new ValidateDeleteCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if cloud category is elsewhere referenced', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator: ValidateDeleteCloudCategory = new ValidateDeleteCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
