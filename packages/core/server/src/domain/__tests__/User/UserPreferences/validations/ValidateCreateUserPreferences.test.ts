import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidLanguageException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLanguageException';
import {ValidateCreateUserPreferences} from '@copor/core/domain/User/UserPreferences/validations/ValidateCreateUserPreferences';
import {
	ValidateCreateUserPreferencesDTO
} from '@copor/core/domain/User/UserPreferences/validations/dto/ValidateCreateUserPreferencesDTO';
import {
	ValidateCreateUserPreferencesRepo
} from '@copor/core/domain/User/UserPreferences/repository/ValidateCreateUserPreferencesRepo';

describe('test validate create user preferences', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateUserPreferencesRepo>;
	let validator: ValidateCreateUserPreferences;
	let input: ValidateCreateUserPreferencesDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidLanguage: jest.fn()
		};
		input = {
			language: 'lid',
			actorId: 'aid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidLanguage.mockResolvedValue(false);
	});
	it('Should throw error if user is not authorized to create userPreferences', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateUserPreferences(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if language is invalid', async () => {
		const errorList = new ErrorList([new InvalidLanguageException()]);

		mockStorageRepo.isInvalidLanguage.mockResolvedValue(true);
		validator = new ValidateCreateUserPreferences(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
