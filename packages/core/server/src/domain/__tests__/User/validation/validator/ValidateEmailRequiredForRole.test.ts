import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {ValidateEmailRequiredForRole} from '@copor/core/domain/User/validation/validator/ValidateEmailRequiredForRole';
import {InvalidEmailException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidEmailException';
import {AuthUserEmailAlreadyInUseException} from '@copor/core/domain/User/exception/AuthUserEmailAlreadyInUseException';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('ValidateEmailRequiredForRole tests', () => {
	const mockRepo: jest.Mocked<ValidateUpdateAuthUserInformationRepo> = {
		isNotValidUser: jest.fn(),
		getUserRoleType: jest.fn(),
		isUserNameUsedByAnotherUser: jest.fn(),
		isEmailUsedByAnotherUser: jest.fn(),
		getPasswordPolicy: jest.fn(),
		wasPasswordRecentlyUsed: jest.fn(),
		getAuthUserId: jest.fn()
	};

	beforeEach(() => {
		mockRepo.isNotValidUser.mockResolvedValue(false);
		mockRepo.isEmailUsedByAnotherUser.mockResolvedValue(false);
		mockRepo.getUserRoleType.mockResolvedValue(RoleType.USER);
	});

	it('Should pass with a valid, unused email', async () => {
		const input: UpdateAuthUserInformationDTO = {
			id: 'userId', userName: 'user', actorId: 'actorId', email: 'a@b.com'
		};
		const validator = new ValidateEmailRequiredForRole(mockRepo, input);

		await expect(validator.validate()).resolves.toBeUndefined();
	});

	it('Should throw InvalidEmailException with a malformed email', async () => {
		const input: UpdateAuthUserInformationDTO = {
			id: 'userId', userName: 'user', actorId: 'actorId', email: 'notMail'
		};
		const validator = new ValidateEmailRequiredForRole(mockRepo, input);

		await expect(validator.validate()).rejects.toStrictEqual(new InvalidEmailException());
	});

	it('Should throw InvalidEmailException when email is missing', async () => {
		const input: UpdateAuthUserInformationDTO = {id: 'userId', userName: 'user', actorId: 'actorId'};
		const validator = new ValidateEmailRequiredForRole(mockRepo, input);

		await expect(validator.validate()).rejects.toStrictEqual(new InvalidEmailException());
	});

	it('Should throw AuthUserEmailAlreadyInUseException when email is already used by another user', async () => {
		mockRepo.isEmailUsedByAnotherUser.mockResolvedValue(true);

		const input: UpdateAuthUserInformationDTO = {
			id: 'userId', userName: 'user', actorId: 'actorId', email: 'a@b.com'
		};
		const validator = new ValidateEmailRequiredForRole(mockRepo, input);

		await expect(validator.validate()).rejects.toStrictEqual(new AuthUserEmailAlreadyInUseException());
	});
});
