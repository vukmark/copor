import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidEmailException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidEmailException';
import {EmailAlreadyInUseException} from '@copor/core/domain/Core/Exceptions/invalid/EmailAlreadyInUseException';
import {
	ValidateCreateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateCreateUserAccountInformationRepo';
import {
	ValidateCreateUserAccountInformationDTO
} from '@copor/core/domain/User/AccountInformation/validations/dto/ValidateCreateUserAccountInformationDTO';
import {
	ValidateCreateUserAccountInformation
} from '@copor/core/domain/User/AccountInformation/validations/ValidateCreateUserAccountInformation';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('create user account information validation tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateCreateUserAccountInformationRepo> = {
		isEmailAlreadyInUse: jest.fn()
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isEmailAlreadyInUse.mockResolvedValue(false);
	});

	it.each([RoleType.USER, RoleType.ADMIN])(
		'Should pass for %s with a valid, unused email',
		async (roleType) => {
			const input: ValidateCreateUserAccountInformationDTO = {actorId: 'actorId', roleType, email: 'a@b.com'};
			const validator = new ValidateCreateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
			const result = await validator.validate();

			expect(result).toBeUndefined();
		}
	);

	it.each([RoleType.USER, RoleType.ADMIN])(
		'Should throw InvalidEmailException for %s with a malformed email',
		async (roleType) => {
			const input: ValidateCreateUserAccountInformationDTO = {actorId: 'actorId', roleType, email: 'not-an-email'};
			const validator = new ValidateCreateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
			const result = await validator.validate();

			expect(result).toStrictEqual(new ErrorList([new InvalidEmailException()]));
		}
	);

	it.each([RoleType.USER, RoleType.ADMIN])(
		'Should throw EmailAlreadyInUseException for %s when the provided email is already in use',
		async (roleType) => {
			mockStorageRepo.isEmailAlreadyInUse.mockResolvedValue(true);

			const input: ValidateCreateUserAccountInformationDTO = {actorId: 'actorId', roleType, email: 'a@b.com'};
			const validator = new ValidateCreateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
			const result = await validator.validate();

			expect(result).toStrictEqual(new ErrorList([new EmailAlreadyInUseException()]));
		}
	);

	it('Should throw InvalidEmailException when email is missing', async () => {
		const input: ValidateCreateUserAccountInformationDTO = {actorId: 'actorId', roleType: RoleType.USER};
		const validator = new ValidateCreateUserAccountInformation(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(new ErrorList([new InvalidEmailException()]));
	});
});
