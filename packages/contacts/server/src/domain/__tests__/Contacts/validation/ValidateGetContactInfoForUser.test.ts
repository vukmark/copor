import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/ValidateGetContactInfoForUserRepo';
import {ValidateGetContactInfoForUser} from '@copor/contacts/domain/Contacts/validation/ValidateGetContactInfoForUser';
import {ValidateGetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/validation/dto/ValidateGetContactInfoForUserDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';

describe('Test validate get contact by ID', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetContactInfoForUserRepo>;
	let validator: ValidateGetContactInfoForUser;

	const input: ValidateGetContactInfoForUserDTO = {
		actorId: 'actor-id',
		userId: 'user-id'
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

	it('should throw error if actor has no permission to get contact', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateGetContactInfoForUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if contact userId is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);

		validator = new ValidateGetContactInfoForUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
