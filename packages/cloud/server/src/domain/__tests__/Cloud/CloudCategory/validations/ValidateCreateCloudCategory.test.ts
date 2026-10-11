import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {CreateCloudCategoryDTO}
	from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/CreateCloudCategoryDTO';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {ValidateCreateCloudCategory}
	from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateCreateCloudCategory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate create cloud category tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateCloudCategory;
	let input: CreateCloudCategoryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			name: 'string',
			description: 'string',
			publishStatus: PublishStatus.published,
			categoryType: CategoryType.groups,
			actorId: 'string'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user is not authorized to create a cloud category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateCloudCategory(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateCreateCloudCategory(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});