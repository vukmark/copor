import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreatePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateCreatePhoneNumberRepo';
import {ValidateCreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateCreatePhoneNumber';
import {ValidateCreatePhoneNumberDTO}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateCreatePhoneNumberDTO';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyPhoneNumberException} from '@copor/core/domain/Core/Exceptions/empty/EmptyPhoneNumberException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('validate create phone number tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreatePhoneNumberRepo>;
	let validator: ValidateCreatePhoneNumber;
	let input: ValidateCreatePhoneNumberDTO[];

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input
			= [
				{
					user: 'userID',
					phoneNumber: 'phone',
					phoneNumberType: PhoneNumberType.PHONE_MOBILE,
					actorId: 'actorID'
				}
			];
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user not authorised to create a phone number', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateCreatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if phone number is empty', async () => {
		const errorList = new ErrorList([new EmptyPhoneNumberException()]);

		input[0].phoneNumber = ' ';
		validator = new ValidateCreatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});