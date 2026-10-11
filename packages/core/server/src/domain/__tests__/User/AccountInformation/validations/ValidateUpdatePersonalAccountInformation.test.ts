import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateUpdateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';
import {
	ValidateUpdatePersonalAccountInformation
} from '@copor/core/domain/User/validation/ValidateUpdatePersonalAccountInformation';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateUpdateUserAccountInformationDTO
} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserAccountInformationDTO';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';

describe('update personal account information validation test', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateUpdateUserAccountInformationRepo> = {
		isNotValidUser: jest.fn(),
		isInvalidCountry: jest.fn(),
		isInvalidState: jest.fn(),
		isInvalidNativeLanguage: jest.fn()
	};
	let validator: ValidateUpdatePersonalAccountInformation;
	const input: ValidateUpdateUserAccountInformationDTO = {
		id: 'id',
		actorId: 'actorId',
		country: 'country',
		state: 'state'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
		mockStorageRepo.isInvalidNativeLanguage.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized to create update Account Information', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdatePersonalAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdatePersonalAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateUpdatePersonalAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if state is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		validator = new ValidateUpdatePersonalAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});