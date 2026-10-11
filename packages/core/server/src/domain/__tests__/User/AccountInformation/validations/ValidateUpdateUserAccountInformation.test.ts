import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {
	ValidateUpdateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';
import {
	ValidateUpdateUserAccountInformationDTO
} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserAccountInformationDTO';
import {ValidateUpdateUserAccountInformation} from '@copor/core/domain/User/validation/ValidateUpdateUserAccountInformation';

describe('update user account information validation tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateUpdateUserAccountInformationRepo> = {
		isInvalidCountry: jest.fn(),
		isInvalidState: jest.fn(),
		isNotValidUser: jest.fn(),
		isInvalidNativeLanguage: jest.fn()
	};
	const input: ValidateUpdateUserAccountInformationDTO = {
		actorId: 'actorId',
		id: 'userId',
		country: 'cId',
		state: 'sId'
	};
	let validator: ValidateUpdateUserAccountInformation;

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
		mockStorageRepo.isInvalidNativeLanguage.mockResolvedValue(false);
	});
	it('Should throw error if user is not authorized to create activityType', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
