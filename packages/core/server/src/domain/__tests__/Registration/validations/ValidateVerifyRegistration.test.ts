import {ValidateVerifyRegistration} from '@copor/core/domain/Registration/validations/ValidateVerifyRegistration';
import {ValidateVerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/ValidateVerifyRegistrationRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {RegistrationDisabledException} from '@copor/core/domain/Registration/exception/RegistrationDisabledException';
import {InvalidCodeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCodeException';

describe('ValidateVerifyRegistration', () => {
	const repo: jest.Mocked<ValidateVerifyRegistrationRepo> = {
		isSelfRegistrationEnabled: jest.fn(),
		isValidVerificationCode: jest.fn(),
		getPendingUserId: jest.fn()
	};
	const input = {email: 'jane.doe@example.com', code: '123456'};

	beforeEach(() => {
		jest.clearAllMocks();
		repo.isSelfRegistrationEnabled.mockResolvedValue(true);
		repo.isValidVerificationCode.mockResolvedValue(true);
	});

	it('accepts a valid code', async () => {
		expect(await new ValidateVerifyRegistration(input, repo).validate()).toBeUndefined();
		expect(repo.isValidVerificationCode).toHaveBeenCalledWith(input);
	});

	it('rejects a wrong or expired code', async () => {
		repo.isValidVerificationCode.mockResolvedValue(false);

		expect(await new ValidateVerifyRegistration(input, repo).validate())
			.toStrictEqual(new ErrorList([new InvalidCodeException()]));
	});

	it('rejects an empty code without checking storage', async () => {
		expect(await new ValidateVerifyRegistration({... input, code: ' '}, repo).validate())
			.toStrictEqual(new ErrorList([new InvalidCodeException()]));
		expect(repo.isValidVerificationCode).not.toHaveBeenCalled();
	});

	it('does not check (or count) the code while registration is off', async () => {
		repo.isSelfRegistrationEnabled.mockResolvedValue(false);

		expect(await new ValidateVerifyRegistration(input, repo).validate())
			.toStrictEqual(new ErrorList([new RegistrationDisabledException()]));
		expect(repo.isValidVerificationCode).not.toHaveBeenCalled();
	});
});
