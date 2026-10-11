import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateCountry} from '@copor/core/domain/Components/Country/validations/ValidateCreateCountry';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('validate create country tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateCountry;
	let input: SaveCountryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			id: 'someId',
			name: 'name',
			code: 'code',
			actorId: 'some-id',
			publishStatus: PublishStatus.published
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not authorized to create country', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateCountry(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if name is empty', async() => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateCreateCountry(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if code is empty', async() => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		validator = new ValidateCreateCountry(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
