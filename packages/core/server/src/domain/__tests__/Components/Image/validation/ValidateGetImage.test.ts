import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidImageException} from '@copor/core/domain/Components/Image/exception/InvalidImageException';
import {ValidateGetImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateGetImageRepo';
import {ValidateGetImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateGetImageDTO';
import {ValidateGetImage} from '@copor/core/domain/Components/Image/validation/ValidateGetImage';


describe('Test validate get image', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetImageRepo>;
	const input: ValidateGetImageDTO = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		actorId: 'aid'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidImage: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidImage.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetImage = new ValidateGetImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if image is invalid', async () => {
		const errorList = new ErrorList([new InvalidImageException()]);

		mockStorageRepo.isInvalidImage.mockResolvedValue(true);
		const validator = new ValidateGetImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});