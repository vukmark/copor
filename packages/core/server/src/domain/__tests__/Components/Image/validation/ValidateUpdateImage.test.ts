import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidImageException} from '@copor/core/domain/Components/Image/exception/InvalidImageException';
import {ValidateUpdateImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateUpdateImageDTO';
import {ValidateUpdateImage} from '@copor/core/domain/Components/Image/validation/ValidateUpdateImage';
import {ValidateUpdateImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateUpdateImageRepo';


describe('Validate update image tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateImageRepo>;
	let validator: ValidateUpdateImage;
	let input: ValidateUpdateImageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidImage: jest.fn()
		};
		input = {
			id: '12345',
			name: 'example_image',
			extension: 'jpg',
			fileSize: 2048,
			width: 1920,
			height: 1080,
			path: '/uploads/images/example_image.jpg',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidImage.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update image', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateUpdateImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if image is invalid', async () => {
		const errorList = new ErrorList([new InvalidImageException()]);

		mockStorageRepo.isInvalidImage.mockResolvedValue(true);
		validator = new ValidateUpdateImage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});