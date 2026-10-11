import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateGetPhoneNumberListRepo
} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateGetPhoneNumberListRepo';
import {
	ValidateGetPhoneNumberListDTO
} from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateGetPhoneNumberListDTO';
import {
	ValidateGetPhoneNumberList
} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateGetPhoneNumberList';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('Validation of getting phone number list for user', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetPhoneNumberListRepo>;
	let input: ValidateGetPhoneNumberListDTO;
	let validator: ValidateGetPhoneNumberList;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			actorId: 'string',
			user: 'string'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to get phone number list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetPhoneNumberList(input, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user id is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateGetPhoneNumberList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});