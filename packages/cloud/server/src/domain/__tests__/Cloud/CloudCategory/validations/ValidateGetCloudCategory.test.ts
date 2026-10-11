import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateCloudCategoryInputDTO} from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateCloudCategoryInputDTO';
import {ValidateGetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateGetCloudCategory';
import {
	ValidateGetCloudCategoryRepo
} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateGetCloudCategoryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';

describe('test validate get cloud category', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetCloudCategoryRepo>;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCloudCategory: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCloudCategory.mockResolvedValue(false);
	});


	it('should throw error if cloud category ID is invalid', async () => {
		const errorList = new ErrorList([new InvalidIDException()]);

		const inputDTO: ValidateCloudCategoryInputDTO = {
			actorId: 'actor-id',
			cloudCategoryId: ''
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		const validator = new ValidateGetCloudCategory(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to get cloud category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const inputDTO: ValidateCloudCategoryInputDTO = {
			actorId: 'actor-id',
			cloudCategoryId: 'cloud-category-id'
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetCloudCategory(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
