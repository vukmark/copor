import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {ValidateUpdateAddress} from '@copor/core/domain/Components/Address/validation/ValidateUpdateAddress';
import {InvalidAddressException} from '@copor/core/domain/Components/Address/exception/InvalidAddressException';
import {ValidateUpdateAddressDTO} from '@copor/core/domain/Components/Address/validation/dto/ValidateUpdateAddressDTO';
import {ValidateUpdateAddressRepo} from '@copor/core/domain/Components/Address/repository/ValidateUpdateAddressRepo';


describe('update address validator tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateAddressRepo>;
	let inputDto: ValidateUpdateAddressDTO;
	let validator: ValidateUpdateAddress;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidAddress: jest.fn(),
			isInvalidState: jest.fn(),
			isInvalidCountry: jest.fn()
		};
		inputDto = {
			id: 'id',
			state: 's',
			country: 'c',
			actorId: 'aid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidAddress.mockResolvedValue(false);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to update address', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateAddress(inputDto, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if address is invalid', async () => {
		const errorList = new ErrorList([new InvalidAddressException()]);

		mockStorageRepo.isInvalidAddress.mockResolvedValue(true);
		validator = new ValidateUpdateAddress(inputDto, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateUpdateAddress(inputDto, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if state is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		validator = new ValidateUpdateAddress(inputDto, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});