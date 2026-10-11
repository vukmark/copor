import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserLoginInformationRepo';
import {ValidateUpdateUserLoginInformationDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserLoginInformationDTO';
import {ValidateUpdateUserLoginInformation} from '@copor/core/domain/User/validation/ValidateUpdateUserLoginInformation';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {InvalidUserPasswordException} from '@copor/core/domain/User/exception/InvalidUserPasswordException';
import {PasswordTooShortException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordTooShortException';

const PASSWORD_POLICY = {
	minPasswordLength: 8,
	maxPasswordLength: 128,
	minLowercaseLetters: 1,
	minUppercaseLetters: 1,
	minDigits: 1,
	minSpecialCharacters: 1,
	allowSpaces: true,
	disallowUsernameInPassword: true,
	disallowEmailOrNameInPassword: true,
	blockCommonPasswords: true,
	maxRepeatedCharacters: 3,
	passwordHistoryCount: 5,
	commonPasswords: []
};

describe('update user login information validation tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateUpdateUserLoginInformationRepo> = {
		isNotValidUser: jest.fn(),
		isInvalidUserPassword: jest.fn(),
		getUserIdentity: jest.fn(),
		getPasswordPolicy: jest.fn(),
		wasPasswordRecentlyUsed: jest.fn()
	};
	const input: ValidateUpdateUserLoginInformationDTO = {
		actorId: 'actorId',
		oldPassword: 'old',
		newPassword: 'aValidPassw0rd!',
		userId: 'uid'
	};
	let validator: ValidateUpdateUserLoginInformation;

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidUserPassword.mockResolvedValue(false);
		mockStorageRepo.getPasswordPolicy.mockResolvedValue(PASSWORD_POLICY);
		mockStorageRepo.wasPasswordRecentlyUsed.mockResolvedValue(false);
		input.newPassword = 'aValidPassw0rd!';
	});

	it('Should throw error if user is not authorized to create activityType', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateUserLoginInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdateUserLoginInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if old password is incorrect', async () => {
		const errorList = new ErrorList([new InvalidUserPasswordException()]);

		mockStorageRepo.isInvalidUserPassword.mockResolvedValue(true);
		validator = new ValidateUpdateUserLoginInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if password does not meet the configured policy', async () => {
		input.newPassword = 'aaa';
		validator = new ValidateUpdateUserLoginInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate() as ErrorList;

		expect(result.list.some((error) => error instanceof PasswordTooShortException)).toBe(true);
	});

	it('Should pass when the password satisfies the configured policy', async () => {
		validator = new ValidateUpdateUserLoginInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});
});
