import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdatePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateUpdatePhoneNumberRepo';
import {ValidateUpdatePhoneNumberDTO}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateUpdatePhoneNumberDTO';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateUpdatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateUpdatePhoneNumber';
import {EmptyPhoneNumberException} from '@copor/core/domain/Core/Exceptions/empty/EmptyPhoneNumberException';
import {InvalidPhoneNumberException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidPhoneNumberException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('Validate update phone number tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdatePhoneNumberRepo>;
	let validator: ValidateUpdatePhoneNumber;
	let input: ValidateUpdatePhoneNumberDTO[];

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidPhoneNumber: jest.fn(),
			isNotValidUser: jest.fn()
		};
		input
            = [
				{
					id: 'phonenumber',
					user: 'userID',
					phoneNumber: 'phone',
					phoneNumberType: PhoneNumberType.PHONE_MOBILE,
					actorId: 'actorID'
				}
			];
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidPhoneNumber.mockResolvedValue(false);
	});

	it('should throw error if user not authorised to update a phone number', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if phone number is empty', async () => {
		const errorList = new ErrorList([new EmptyPhoneNumberException()]);

		input[0].phoneNumber = ' ';
		validator = new ValidateUpdatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if phone number is invalid', async () => {
		const errorList = new ErrorList([new InvalidPhoneNumberException()]);

		mockStorageRepo.isInvalidPhoneNumber.mockResolvedValue(true);
		validator = new ValidateUpdatePhoneNumber(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});