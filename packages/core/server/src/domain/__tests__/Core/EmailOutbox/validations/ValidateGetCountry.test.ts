import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {ValidateGetCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateGetCountryRepo';
import {ValidateGetCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateGetCountryDTO';
import {ValidateGetCountry} from '@copor/core/domain/Components/Country/validations/ValidateGetCountry';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate get country tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetCountryRepo>;
	let input: ValidateGetCountryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn()
		};
		input = {
			actorId: 'actorID',
			countryId: 'countryID'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission to get country', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetCountry = new ValidateGetCountry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);
		const validator = new ValidateGetCountry(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
