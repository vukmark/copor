import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateUpdateRegionRepo';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {ValidateUpdateRegion} from '@copor/core/domain/Components/Region/validations/ValidateUpdateRegion';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {EmptyPostalCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyPostalCodeException';

describe('validate can update region', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateRegionRepo>;
	let input: SaveRegionDTO;
	let validator: ValidateUpdateRegion;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegion: jest.fn(),
			isInvalidCountry: jest.fn(),
			isInvalidState: jest.fn()
		};
		input = {
			id: 'unique-id',
			actorId: 'actorId',
			country: 'country',
			postalCode: 'postalCode',
			state: 'state'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to create region', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country id is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateUpdateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state id is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		validator = new ValidateUpdateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if postal code is empty', async() => {
		const errorList = new ErrorList([new EmptyPostalCodeException()]);

		input.postalCode = '';
		validator = new ValidateUpdateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
