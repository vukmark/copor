import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateDeleteRegionCityRepo';
import {ValidateDeleteRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateDeleteRegionCityDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeleteRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateDeleteRegionCity';
import {InvalidRegionCityException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionCityException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete region-city tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteRegionCityRepo>;
	let input: ValidateDeleteRegionCityDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegionCity: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'user-id',
			regionCityId: 'unique-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if region-city with provided id does not exist', async () => {
		const errorList = new ErrorList([new InvalidRegionCityException()]);

		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(true);
		const validator = new ValidateDeleteRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if region-city has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});