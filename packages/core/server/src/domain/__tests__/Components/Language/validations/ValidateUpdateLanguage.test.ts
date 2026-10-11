import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {ValidateUpdateLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateUpdateLanguageRepo';
import {ValidateUpdateLanguage} from '@copor/core/domain/Components/Language/validations/ValidateUpdateLanguage';
import {InvalidLanguageException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLanguageException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate update language tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateLanguageRepo>;
	let validator: ValidateUpdateLanguage;
	let input: SaveLanguageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidLanguage: jest.fn()
		};
		input = {
			id: 'sId',
			name: 'name',
			code: 'code',
			nativeName: 'nativeName',
			publishStatus: PublishStatus.published,
			actorId: 'crId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidLanguage.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update language', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if user is not authorized to create a language', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if native name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.nativeName = '';
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if code is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if language is invalid', async () => {
		const errorList = new ErrorList([new InvalidLanguageException()]);

		mockStorageRepo.isInvalidLanguage.mockResolvedValue(true);
		validator = new ValidateUpdateLanguage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});