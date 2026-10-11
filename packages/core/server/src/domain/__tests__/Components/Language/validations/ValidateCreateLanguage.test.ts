import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {CreateLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/CreateLanguageDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {ValidateCreateLanguage} from '@copor/core/domain/Components/Language/validations/ValidateCreateLanguage';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validate create language tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateLanguage;
	let input: CreateLanguageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			name: 'name',
			code: 'code',
			nativeName: 'nativeName',
			publishStatus: PublishStatus.published,
			actorId: 'crId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('Should throw error if user is not authorized to create a language', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateLanguage(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateCreateLanguage(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if native name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.nativeName = '';
		validator = new ValidateCreateLanguage(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if code is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		validator = new ValidateCreateLanguage(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});