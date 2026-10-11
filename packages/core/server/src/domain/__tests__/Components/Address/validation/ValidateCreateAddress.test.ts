import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {ValidateCreateClassAddress} from '@copor/core/domain/Components/Address/validation/ValidateCreateClassAddress';
import {ValidateCreateAddressDTO} from '@copor/core/domain/Components/Address/validation/dto/ValidateCreateAddressDTO';
import {ValidateCreateAddressRepo} from '@copor/core/domain/Components/Address/repository/ValidateCreateAddressRepo';

describe('create address validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateCreateAddressRepo> = {
		isInvalidCountry: jest.fn(),
		isInvalidState: jest.fn()
	};
	const input: ValidateCreateAddressDTO = {
		actorId: 'aid',
		country: 'cid',
		state: 'sid'
	};

	beforeEach(() => {
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user is not authorized to create a address', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateCreateClassAddress(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		const validator = new ValidateCreateClassAddress(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if state is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		const validator = new ValidateCreateClassAddress(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});