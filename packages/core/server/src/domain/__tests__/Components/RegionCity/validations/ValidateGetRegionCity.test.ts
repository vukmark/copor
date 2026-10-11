import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateGetRegionCityRepo';
import {ValidateGetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateGetRegionCityDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateGetRegionCity';
import {InvalidRegionCityException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionCityException';

describe('Test validate get region-city', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetRegionCityRepo>;
	const input: ValidateGetRegionCityDTO = {
		actorId: 'actor-id',
		regionCityId: 'some-region'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegionCity: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(false);
	});

	it('should throw error if user has no permission to get region', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetRegionCity = new ValidateGetRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if region-city is invalid', async() => {
		const errorList = new ErrorList([new InvalidRegionCityException()]);

		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(true);
		const validator = new ValidateGetRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});