import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {InvalidCloudCategoryException} from '@copor/cloud/domain/Cloud/CloudCategory/exception/InvalidCloudCategoryException';
import {ValidateUpdateCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateUpdateCloudCategoryRepo';
import {ValidateUpdateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateUpdateCloudCategory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate update cloud category tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateCloudCategoryRepo>;
	let validator: ValidateUpdateCloudCategory;
	let input: SaveCloudCategoryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCloudCategory: jest.fn()
		};
		input = {
			id: 'some-id',
			name: 'some cloud category name',
			publishStatus: PublishStatus.published,
			categoryType: CategoryType.groups,
			actorId: 'crId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCloudCategory.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update cloud category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if cloud category name is empty', async() => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if cloud category is invalid', async () => {
		const errorList = new ErrorList([new InvalidCloudCategoryException()]);

		mockStorageRepo.isInvalidCloudCategory.mockResolvedValue(true);
		validator = new ValidateUpdateCloudCategory(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});