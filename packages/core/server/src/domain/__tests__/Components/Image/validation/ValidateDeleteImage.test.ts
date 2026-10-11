import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeleteImage} from '@copor/core/domain/Components/Image/validation/ValidateDeleteImage';
import {InvalidImageException} from '@copor/core/domain/Components/Image/exception/InvalidImageException';
import {ValidateDeleteImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateDeleteImageDTO';
import {ValidateDeleteImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateDeleteImageRepo';

describe('Validate delete image tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateDeleteImageRepo> = {
		isInvalidImage: jest.fn()
	};
	const input: ValidateDeleteImageDTO = {
		imageId: 'iid',
		actorId: 'aid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidImage.mockResolvedValue(false);
	});

	it('Should throw error if user has no permission to delete image', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if image id is invalid', async() => {
		const errorList = new ErrorList([new InvalidImageException()]);

		mockStorageRepo.isInvalidImage.mockResolvedValue(true);
		const validator = new ValidateDeleteImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});