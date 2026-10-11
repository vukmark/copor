import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateUpdateCountryRepo';
import {ValidateUpdateCountry} from '@copor/core/domain/Components/Country/validations/ValidateUpdateCountry';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('validate update country', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateCountryRepo>;
	let validator: ValidateUpdateCountry;
	let input: SaveCountryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn()
		};
		input = {
			id: 'some-id',
			name: 'name',
			code: 'code',
			actorId: 'some-id',
			publishStatus: PublishStatus.published
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update country', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateUpdateCountry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateUpdateCountry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateCountry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the code is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		validator = new ValidateUpdateCountry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
