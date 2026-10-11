import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateGetUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateGetUserAccountInformationRepo';
import {
	ValidateGetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/validations/dto/ValidateGetUserAccountInformationForDisplayDTO';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {
	ValidateGetUserAccountInformationForDisplay
} from '@copor/core/domain/User/AccountInformation/validations/ValidateGetUserAccountInformationForDisplay';

describe('get user account information validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateGetUserAccountInformationRepo> = {
		isNotValidUser: jest.fn()
	};
	const input: ValidateGetUserAccountInformationForDisplayDTO = {
		actorId: 'aid',
		userId: 'uid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to get account information', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetUserAccountInformationForDisplay(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		const validator = new ValidateGetUserAccountInformationForDisplay(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});