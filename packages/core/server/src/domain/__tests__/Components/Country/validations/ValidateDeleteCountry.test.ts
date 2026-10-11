import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateDeleteCountryRepo';
import {ValidateDeleteCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateDeleteCountryDTO';
import {ValidateDeleteCountry} from '@copor/core/domain/Components/Country/validations/ValidateDeleteCountry';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('Validate deletion of a country', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteCountryRepo>;
	let input: ValidateDeleteCountryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'someUserId',
			countryId: 'deletedCountryId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw if user has no permission to delete a country', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const validator = new ValidateDeleteCountry(input, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		const validator = new ValidateDeleteCountry(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is referenced', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);
		const validator = new ValidateDeleteCountry(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});