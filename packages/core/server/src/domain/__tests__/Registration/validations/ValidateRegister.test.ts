import {ValidateRegister} from '@copor/core/domain/Registration/validations/ValidateRegister';
import {ValidateRegisterRepo} from '@copor/core/domain/Registration/repository/ValidateRegisterRepo';
import {ValidateRegisterDTO} from '@copor/core/domain/Registration/validations/dto/ValidateRegisterDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {RegistrationDisabledException} from '@copor/core/domain/Registration/exception/RegistrationDisabledException';
import {EmailAlreadyInUseException} from '@copor/core/domain/Core/Exceptions/invalid/EmailAlreadyInUseException';
import {AuthUsernameAlreadyInUseException} from '@copor/core/domain/User/exception/AuthUsernameAlreadyInUseException';
import {InvalidUsernameException} from '@copor/core/domain/User/exception/InvalidUsernameException';
import {InvalidEmailException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidEmailException';
import {InvalidFirstNameException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFirstNameException';
import {PasswordTooShortException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordTooShortException';

const PASSWORD_POLICY = {
	minPasswordLength: 8,
	maxPasswordLength: 128,
	minLowercaseLetters: 1,
	minUppercaseLetters: 1,
	minDigits: 1,
	minSpecialCharacters: 1,
	allowSpaces: true,
	disallowUsernameInPassword: true,
	disallowEmailOrNameInPassword: true,
	blockCommonPasswords: true,
	maxRepeatedCharacters: 3,
	passwordHistoryCount: 5,
	commonPasswords: []
};

describe('ValidateRegister', () => {
	const repo: jest.Mocked<ValidateRegisterRepo> = {
		isSelfRegistrationEnabled: jest.fn(),
		isEmailAlreadyInUse: jest.fn(),
		getPasswordPolicy: jest.fn(),
		isUsernameTaken: jest.fn()
	};
	let input: ValidateRegisterDTO;

	beforeEach(() => {
		jest.clearAllMocks();
		repo.isSelfRegistrationEnabled.mockResolvedValue(true);
		repo.isEmailAlreadyInUse.mockResolvedValue(false);
		repo.getPasswordPolicy.mockResolvedValue(PASSWORD_POLICY);
		repo.isUsernameTaken.mockResolvedValue(false);
		input = {
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane.doe@example.com',
			userName: 'jane.doe',
			password: 'Str0ng!Secret'
		};
	});

	const errorNames = async () => {
		const result = await new ValidateRegister(input, repo).validate();

		return result instanceof ErrorList ? result.list.map((error) => error.name).sort() : [];
	};

	it('accepts a complete, valid registration', async () => {
		expect(await new ValidateRegister(input, repo).validate()).toBeUndefined();
	});

	it('reports only RegistrationDisabled when self-registration is off', async () => {
		repo.isSelfRegistrationEnabled.mockResolvedValue(false);
		repo.isEmailAlreadyInUse.mockResolvedValue(true);

		expect(await new ValidateRegister(input, repo).validate())
			.toStrictEqual(new ErrorList([new RegistrationDisabledException()]));
		expect(repo.isEmailAlreadyInUse).not.toHaveBeenCalled();
	});

	it('rejects an email that is already in use', async () => {
		repo.isEmailAlreadyInUse.mockResolvedValue(true);

		expect(await errorNames()).toStrictEqual([new EmailAlreadyInUseException().name]);
	});

	it('rejects a taken username', async () => {
		repo.isUsernameTaken.mockResolvedValue(true);

		expect(await errorNames()).toStrictEqual([new AuthUsernameAlreadyInUseException().name]);
	});

	it.each(['ab', 'has space', 'semi;colon', 'x'.repeat(51)])('rejects the malformed username %p', async (userName) => {
		input.userName = userName;

		expect(await errorNames()).toContain(new InvalidUsernameException().name);
	});

	it('collects every invalid field at once', async () => {
		input.firstName = ' ';
		input.email = 'not-an-email';
		input.password = 'Sh0rt!';

		expect(await errorNames()).toStrictEqual([
			new InvalidEmailException().name,
			new InvalidFirstNameException().name,
			new PasswordTooShortException().name
		].sort());
	});
});
