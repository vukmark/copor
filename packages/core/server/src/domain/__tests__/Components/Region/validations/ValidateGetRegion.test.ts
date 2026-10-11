import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetRegion} from '@copor/core/domain/Components/Region/validations/ValidateGetRegion';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateGetRegionDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidRegionException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionException';
import {ValidateGetRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateGetRegionRepo';

describe('Test validate get region', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetRegionRepo>;
	const input: ValidateGetRegionDTO = {
		actorId: 'actor-id',
		regionId: 'some-region'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegion: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRegion.mockResolvedValue(false);
	});

	it('should throw error if user has no permission to get region', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetRegion = new ValidateGetRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if region is invalid', async() => {
		const errorList = new ErrorList([new InvalidRegionException()]);

		mockStorageRepo.isInvalidRegion.mockResolvedValue(true);
		const validator = new ValidateGetRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});