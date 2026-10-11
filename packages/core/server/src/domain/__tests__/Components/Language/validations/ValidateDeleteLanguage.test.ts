import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeleteLanguage} from '@copor/core/domain/Components/Language/validations/ValidateDeleteLanguage';
import {ValidateDeleteLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateDeleteLanguageRepo';
import {ValidateDeleteLanguageDTO} from '@copor/core/domain/Components/Language/validations/dto/ValidateDeleteLanguageDTO';
import {InvalidLanguageException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLanguageException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete language tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteLanguageRepo>;
	let input: ValidateDeleteLanguageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidLanguage: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'user-id',
			languageId: 'language-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidLanguage.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to delete language', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateDeleteLanguage(input, mockPermissionRepo, mockStorageRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if language id is invalid', async () => {
		const errorList = new ErrorList([new InvalidLanguageException()]);

		const validator = new ValidateDeleteLanguage(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidLanguage.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if entity has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);
		const validator = new ValidateDeleteLanguage(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'tableName'});
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
