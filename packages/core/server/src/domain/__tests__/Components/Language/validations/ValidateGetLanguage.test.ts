import {PermissionRepository} from '../../../../Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '../../../../Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '../../../../Core/Exceptions/ErrorList';
import {ValidateGetLanguage} from '../../../../Components/Language/validations/ValidateGetLanguage';
import {InvalidLanguageException} from '../../../../Core/Exceptions/invalid/InvalidLanguageException';
import {ValidateGetLanguageDTO} from '@copor/core/domain/Components/Language/validations/dto/ValidateGetLanguageDTO';
import {ValidateGetLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateGetLanguageRepo';

describe('test validate get language', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetLanguageRepo>;
	let input: ValidateGetLanguageDTO;
	let validator: ValidateGetLanguage;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidLanguage: jest.fn()
		};
		input = {
			actorId: 'actor-id',
			languageId: 'languageId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidLanguage.mockResolvedValue(false);
	});

	it('should throw error if language ID is empty', async () => {
		const errorList = new ErrorList([new InvalidLanguageException()]);

		mockStorageRepo.isInvalidLanguage.mockResolvedValue(true);
		validator = new ValidateGetLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to get language', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});