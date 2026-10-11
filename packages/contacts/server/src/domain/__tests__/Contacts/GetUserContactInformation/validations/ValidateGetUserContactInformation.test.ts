import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateGetUserContactInformation
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/ValidateGetUserContactInformation';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {
	ValidateGetUserContactInformationDTO
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/dto/ValidateGetUserContactInformationDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('Test validate get user contact information', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<IsNotValidUserRepo>;
	let validator: ValidateGetUserContactInformation;

	const input: ValidateGetUserContactInformationDTO = {
		actorId: 'actorId',
		userId: 'userId'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if actor has no permission to get User Contact Information', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateGetUserContactInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if contact userId is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);

		validator = new ValidateGetUserContactInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});