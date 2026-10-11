import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateCreateRegionRepo';
import {ValidateCreateRegion} from '@copor/core/domain/Components/Region/validations/ValidateCreateRegion';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateCreateRegionDTO';

describe('Validate can create region', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateRegionRepo>;
	let validator: ValidateCreateRegion;
	let input: ValidateCreateRegionDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn(),
			isInvalidState: jest.fn()
		};
		input = {
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
		validator = new ValidateCreateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country id is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateCreateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state id is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		validator = new ValidateCreateRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
